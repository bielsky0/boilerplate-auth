import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserReposiotry } from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate as addUserValidate } from "./add/addUserValidator";
import { makeCreateUser } from "./add/addUser";

export const makeUsers = (userRepository: UserReposiotry) => {
  const authService = makeAuthService({
    cryptoService: bcrypt,
    jwtService: {
      sign: jwt.sign,
      verify: jwt.verify,
    },
  });

  return {
    createUser: makeCreateUser({
      userRepository,
      validate: addUserValidate,
      authService,
    }),
  };
};
