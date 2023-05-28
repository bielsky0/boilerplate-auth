import { User } from "@domain/entities/user";
import { UserReposiotry } from "@domain/interfaces";

export type FindUserCommand = Readonly<{
  email: string;
}>;

export type MakeFindUserDependencies = {
  userRepository: UserReposiotry;
};

export const makeFindUser = ({ userRepository }: MakeFindUserDependencies) => {
  return async (command: FindUserCommand): Promise<User | null> => {
    return await userRepository.getByEmail(command.email);
  };
};
