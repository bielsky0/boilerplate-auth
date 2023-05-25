import { InvalidTokenException } from "@application/exceptions";
import {
  AuthService,
  CacheRepository,
  UserReposiotry,
} from "@domain/interfaces";

export type RefreshTokenCommand = Readonly<{
  cookies?: any;
}>;

export type MakeRefreshTokenDependencies = {
  userRepository: UserReposiotry;
  authService: AuthService;
  cacheRepository: CacheRepository;
};

export const makeRefreshToken = ({
  userRepository,
  authService,
}: MakeRefreshTokenDependencies) => {
  return async (command: RefreshTokenCommand) => {
    const { cookies } = command;

    if (!cookies?.refresh_token)
      throw new InvalidTokenException("Cant find refresh token in cookies");

    const oldRefreshToken = cookies.refresh_token;

    const foundUser = await userRepository.getUserByRefreshToken(
      oldRefreshToken
    );

    if (!foundUser) {
      const { email } = authService.verifyJwt(
        oldRefreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as { email: string };

      await userRepository.updateRefreshTokensByEmail(email, []);

      throw new InvalidTokenException("Detected refresh token reuse!");
    }

    const newRefreshTokenArray = foundUser.refreshTokens.filter(
      (rt) => rt !== oldRefreshToken
    );

    const { email } = authService.verifyJwt(
      oldRefreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    ) as { email: string };

    if (email !== foundUser.email)
      throw new InvalidTokenException("Decoded invalid email");

    const accessToken = authService.signJwt(
      { email: foundUser.email },
      `${process.env.ACCES_TOKEN_SECRET}`,
      { expiresIn: "10s" }
    );

    const newRefreshToken = authService.signJwt(
      { email: foundUser.email },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: "1d" }
    );

    await userRepository.updateRefreshTokensByEmail(foundUser.email, [
      ...newRefreshTokenArray,
      newRefreshToken,
    ]);

    return {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    };
  };
};
