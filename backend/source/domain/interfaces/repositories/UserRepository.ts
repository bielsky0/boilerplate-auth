import { User } from "@domain/entities/user";

export interface UserReposiotry {
  create: (user: User) => Promise<User | undefined>;
  getByEmail: (email: string) => Promise<User | null>;
  updateRefreshTokensByEmail: (
    email: string,
    refreshTokens: string[]
  ) => Promise<User>;
}
