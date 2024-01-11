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

      const data = await db.get(key);

      return data;
    },
    setEx: async (key, seconds, value) => {

      await db.setEx(key, seconds, value);
    },
    lpush: async (key, values) => {
      await db.lPush(key, values);
    },
    lrange: async (key, start, stop) => {

      const data = await db.lRange(key, start, stop);

      return data;
    },
    del: async (keys) => {
      const data = await db.del(keys);
      return data;
    },
  };
};
