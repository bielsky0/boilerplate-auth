import {
  makeApplication,
  Dependencies as AppDependencies,
} from "@application/di";
import {
  Dependencies as InfrastructureDependencies,
  makeInfrastructure,
} from "@infrastructure/di";

export type Dependencies = InfrastructureDependencies & AppDependencies;

export function makeContainer() {
  return {
    ...makeInfrastructure(),
    ...makeApplication(),
  } as Dependencies;
}
