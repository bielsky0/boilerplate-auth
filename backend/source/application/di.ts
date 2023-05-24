import { makeInfrastructure } from "@infrastructure/di";

import { makeUsers } from "@application/useCases/user";
import { makeAuth } from "@application/useCases/auth";

export type Dependencies = {
  users: ReturnType<typeof makeUsers>;
  auth: ReturnType<typeof makeAuth>;
};

export function makeApplication(): Dependencies {
  const InfrastructureDependencies = makeInfrastructure();

  return {
    users: makeUsers(InfrastructureDependencies.userRepository),
    auth: makeAuth(
      InfrastructureDependencies.userRepository,
      InfrastructureDependencies.cacheRepository
    ),
  };
}
