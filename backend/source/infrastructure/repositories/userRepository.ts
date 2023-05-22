import { User } from "@domain/entities/user";
import { UserReposiotry } from "@domain/interfaces";
import { PrismaClient } from "@prisma/client";

export type MakeUserRepositoryDependencies = {
  db: PrismaClient;
};

export function makeUserRepository({
  db,
}: MakeUserRepositoryDependencies): UserReposiotry {
  return {
    async create(user: User) {
      return await db.user.create({
        data: {
          password: user.password,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    },
    async getByEmail(email: string) {
      return await db.user.findUnique({
        where: {
          email: email,
        },
      });
    },
  };
}
