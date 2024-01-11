import {
  makeApplication,
  Dependencies as AppDependencies,
} from "@application/di";
import {
  Dependencies as InfrastructureDependencies,
  makeInfrastructure,
} from "@infrastructure/di";

export type Dependencies = InfrastructureDependencies & AppDependencies;

export async function makeContainer() {

  const infra = await makeInfrastructure();

  const app = makeApplication(infra)

  return {
    ...infra,
    ...app,
  } as Dependencies;
}
