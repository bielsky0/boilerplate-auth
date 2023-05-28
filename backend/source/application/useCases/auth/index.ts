import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  AuthService,
  CacheRepository,
  UserReposiotry,
} from "@domain/interfaces";
import { makeAuthService } from "@application/services";

import { validate as loginUserValidate } from "@application/useCases/auth/login/loginUserValidator";
import { makeLoginUser } from "@application/useCases/auth/login";
import { makeRefreshToken } from "./refreshToken";
import { makeLogout } from "./logout/logout";

export type MakeAuthDependencies = {
  userRepository: UserReposiotry;
  authService: AuthService;
  cacheRepository: CacheRepository;
};

export const makeAuth = ({
  userRepository,
  cacheRepository,
  authService,
}: MakeAuthDependencies) => {
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
    logout: makeLogout({
      userRepository,
    }),
  };
};
