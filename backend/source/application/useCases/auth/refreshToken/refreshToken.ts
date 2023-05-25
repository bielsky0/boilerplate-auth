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
    // TODO find user by refresh_token
    // if we don't find the user but we did recived refresh_token
    // that means refresh_token been already used and deleted
    // TODO make generic jwt
    const { email } = authService.verifyJwt(
      oldRefreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`
    ) as { email: string };

    const user = await userRepository.getByEmail(email);

    console.log("refresh_token", email);
  };
};
