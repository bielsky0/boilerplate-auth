import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CacheRepository, UserReposiotry } from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate as loginUserValidate } from "@application/useCases/auth/login/loginUserValidator";
import { makeLoginUser } from "@application/useCases/auth/login";
import { makeRefreshToken } from "./refreshToken";

export const makeAuth = (
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
    loginUser: makeLoginUser({
      validate: loginUserValidate,
      userRepository,
      authService,
      cacheRepository,
    }),
    refreshToken: makeRefreshToken({
      userRepository,
      authService,
      cacheRepository,
    }),
  };
};
