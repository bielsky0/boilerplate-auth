import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { makeInfrastructure } from "@infrastructure/di";

import { makeUsers } from "@application/useCases/user";
import { makeAuth } from "@application/useCases/auth";
import { makeAuthService } from "./services";

export type Dependencies = {
  users: ReturnType<typeof makeUsers>;
  auth: ReturnType<typeof makeAuth>;
  authService: ReturnType<typeof makeAuthService>;
};

export function makeApplication(): Dependencies {
  const InfrastructureDependencies = makeInfrastructure();

  const authService = makeAuthService({
    cryptoService: bcrypt,
    jwtService: {
      sign: jwt.sign,
      verify: jwt.verify,
    },
  });

  return {
    users: makeUsers({
      userRepository: InfrastructureDependencies.userRepository,
      authService,
    }),
    auth: makeAuth({
      userRepository: InfrastructureDependencies.userRepository,
      authService,
      cacheRepository: InfrastructureDependencies.cacheRepository,
    }),
    authService,
  };
}
