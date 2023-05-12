import { User } from "@domain/entities/user";
import { Role } from "@domain/entities/user/types";
import { AuthService, UserReposiotry } from "@domain/interfaces";

export type CreateUserCommand = Readonly<{
  email: string;
  password: string;
  name: string | null;
  role: Role;
}>;

export type MakeCreateUserDependencies = {
  userRepository: UserReposiotry;
  validate: (command: CreateUserCommand) => Promise<void>;
  authService: AuthService;
};

export const makeCreateUser = ({
  userRepository,
  validate,
  authService,
}: MakeCreateUserDependencies) => {
  return async (command: CreateUserCommand): Promise<User | undefined> => {
    await validate(command);

    const { create } = userRepository;
    const { hashPassword } = authService;

    const hashedPass = await hashPassword(command.password);

    const user = new User({ ...command, password: hashedPass });

    return await create(user);
  };
};
