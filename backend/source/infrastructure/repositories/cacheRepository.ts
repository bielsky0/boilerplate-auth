import { CacheRepository } from "@domain/interfaces";
import { RedisClientType } from "@infrastructure/database/redis";

export type MakeCacheRepositoryDependencies = {
  db: RedisClientType;
};

export const makeCacheRepository = ({
  db,
}: MakeCacheRepositoryDependencies): CacheRepository => {
  return {
    set: async (key: string, value: string) => {
      await db.set(key, value);
    },
    get: async (key: string) => {
      return await db.get(key);
    },
    setEx: async (key, seconds, value) => {
      await db.setEx(key, seconds, value);
    },
  };
};
