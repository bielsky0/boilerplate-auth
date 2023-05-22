import { User } from "@domain/entities/user";
import {
  AuthService,
  CacheRepository,
  UserReposiotry,
} from "@domain/interfaces";

export type LoginUserCommand = Readonly<{
  body: {
    email: string;
  };
  cookies: any;
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
    console.log(command);
    const user = await userRepository.getByEmail(command.body.email);

    console.log(user, "user");

    if (!user)
      throw new Error(`User with ${command.body.email} does not exists`);

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
    console.log({ accessToken: accessToken, refreshToken: newRefreshToken });

    await cacheRepository.set(
      user.email,
      JSON.stringify({
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      })
    );

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    };
  };
};
