import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Dependencies as InfraDependencies } from "@infrastructure/di";

import { makeUsers } from "@application/useCases/user";
import { makeAuth } from "@application/useCases/auth";
import { makeAuthService } from "./services";

export type Dependencies = {
  users: ReturnType<typeof makeUsers>;
  auth: ReturnType<typeof makeAuth>;
  authService: ReturnType<typeof makeAuthService>;
};

export function makeApplication(infraDependencies: InfraDependencies): Dependencies {

  const authService = makeAuthService({
    cryptoService: bcrypt,
    jwtService: {
      sign: jwt.sign,
      verify: jwt.verify,
    },
  });

  return {
    users: makeUsers({
      userRepository: infraDependencies.userRepository,
      authService,
    }),
    auth: makeAuth({
      userRepository: infraDependencies.userRepository,
      authService,
      cacheRepository: infraDependencies.cacheRepository,
    }),
    authService,
  };
}
