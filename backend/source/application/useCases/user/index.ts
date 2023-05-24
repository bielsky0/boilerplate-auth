import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CacheRepository, UserReposiotry } from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate as addUserValidate } from "./add/addUserValidator";
import { validate as loginUserValidate } from "./login/loginUserValidator";
import { makeCreateUser } from "./add/addUser";
import { makeLoginUser } from "./login";

export const makeUsers = (
  userRepository: UserReposiotry,
  cacheRepository: CacheRepository
) => {
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
    loginUser: makeLoginUser({
      validate: loginUserValidate,
      userRepository,
      authService,
      cacheRepository,
    }),
  };
};
