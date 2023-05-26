import { InvalidTokenException } from "@application/exceptions";
import { UserReposiotry } from "@domain/interfaces";

export type LogoutCommand = Readonly<{
  cookies?: any;
}>;

export type MakeLogoutDependencies = {
  userRepository: UserReposiotry;
};

export const makeLogout = ({ userRepository }: MakeLogoutDependencies) => {
  return async (command: LogoutCommand) => {
    const { cookies } = command;

    if (!cookies) throw new InvalidTokenException("There is no cookies");

    const refreshToken = cookies.refresh_token;

    const foundUser = await userRepository.getUserByRefreshToken(refreshToken);

    if (!foundUser) {
      return;
    }

    const newRefreshTokenArray = foundUser.refreshTokens.filter(
      (rt) => rt !== refreshToken
    );

    await userRepository.updateRefreshTokensByEmail(
      foundUser.email,
      newRefreshTokenArray
    );

    return;
  };
};
