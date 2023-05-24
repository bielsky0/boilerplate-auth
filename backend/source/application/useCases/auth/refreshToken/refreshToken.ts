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
  cacheRepository,
}: MakeRefreshTokenDependencies) => {
  return async (command: RefreshTokenCommand) => {
    const { cookies } = command;

    if (!cookies?.refresh_token)
      throw new InvalidTokenException("Cant find refresh token in cookies");

    const oldRefreshToken = cookies.refresh_token;

    const data = authService.verifyJwt(
      oldRefreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    );

    console.log("refresh_token", data);
  };
};
