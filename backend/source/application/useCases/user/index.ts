import bcrypt from "bcryptjs";

import { UserReposiotry } from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate } from "./addUserValidator";
import { makeCreateUser } from "./addUser";

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
