import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CacheRepository, UserReposiotry } from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate } from "./add/addUserValidator";
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
      validate: validate,
      authService,
    }),
    loginUser: makeLoginUser({
      userRepository,
      authService,
      cacheRepository,
    }),
  };
};
