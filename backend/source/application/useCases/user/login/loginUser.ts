import { User } from "@domain/entities/user";
import {
  AuthService,
  CacheRepository,
  UserReposiotry,
} from "@domain/interfaces";

export type LoginUserCommand = Readonly<{
  body: {
    email: string;
    password: string;
  };
  cookies?: any;
}>;

export type MakeCreateUserDependencies = {
  userRepository: UserReposiotry;
  authService: AuthService;
  cacheRepository: CacheRepository;
};

export const makeLoginUser = ({
  userRepository,
  authService,
  cacheRepository,
}: MakeCreateUserDependencies) => {
  return async (
    command: LoginUserCommand
  ): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> => {
    const {
      body: { email, password },
      cookies,
    } = command;

    const user = await userRepository.getByEmail(email);

    if (!user) throw new Error(`User with ${email} does not exists`);

    const match = await authService.comparePassword(password, user.password);

    if (!match) throw new Error(`Password doesn't match`);

    const accessToken = authService.signJwt(
      { email: user.email },
      process.env.ACCES_TOKEN_SECRET || "shhhh",
      { expiresIn: "10s" }
    );

    const newRefreshToken = authService.signJwt(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET || "shhhh",
      { expiresIn: "1d" }
    );

    const refreshTokenFamily = await cacheRepository.lrange(user.email, 0, -1);

    let newRefreshTokenArray = !cookies?.refresh_token
      ? refreshTokenFamily
      : refreshTokenFamily.filter((rt) => rt === cookies.refresh_token);

    if (cookies?.refresh_token) {
      /* 
        Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */

      const refreshToken = cookies?.refresh_token;

      // check if token is in token array

      const check = refreshTokenFamily.find((token) => token === refreshToken);

      if (!check) {
        newRefreshTokenArray = [];
        await cacheRepository.del([user.email]);
      }
      // if isn't clear cookies and token array
    }

    await cacheRepository.lpush(user.email, [
      ...newRefreshTokenArray,
      newRefreshToken,
    ]);

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    };
  };
};
