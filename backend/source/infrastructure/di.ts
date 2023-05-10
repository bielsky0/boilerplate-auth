import { PrismaClient } from "@prisma/client";
import * as Interfaces from "@domain/interfaces";
import * as repositories from "./repositories";

export type Dependencies = {
  userRepository: Interfaces.UserReposiotry;
};

export function makeInfrastructure(): Dependencies {
  const db: PrismaClient = new PrismaClient();

  return {
    userRepository: repositories.makeUserRepository({ db }),
  };
}
