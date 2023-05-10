import { makeInfrastructure } from "@infrastructure/di";
import { makeUsers } from "./useCases/user";

export type Dependencies = {
  users: ReturnType<typeof makeUsers>;
};

export function makeApplication(): Dependencies {
  const InfrastructureDependencies = makeInfrastructure();

  return {
    users: makeUsers(InfrastructureDependencies.userRepository),
  };
}
