import { makeCreateUser } from "./addUser";
import { UserReposiotry } from "@domain/interfaces";
import { validate } from "./addUserValidator";
import { makeAuthService } from "@application/services";
import bcrypt from "bcryptjs";

export const makeUsers = (userRepository: UserReposiotry) => {
  const authService = makeAuthService({ cryptoService: bcrypt });

  return {
    createUser: makeCreateUser({
      userRepository,
      validate: validate,
      authService,
    }),
  };
};
