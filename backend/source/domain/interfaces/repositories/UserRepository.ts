import { User } from "@domain/entities/user";

export interface UserReposiotry {
  create: (user: User) => Promise<User | undefined>;
}
