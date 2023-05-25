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
      await db.connect();
      await db.set(key, value);
      await db.quit();
    },
    get: async (key: string) => {
      await db.connect();

      const data = await db.get(key);
      await db.quit();

      return data;
    },
    setEx: async (key, seconds, value) => {
      await db.connect();

      await db.setEx(key, seconds, value);
      await db.quit();
    },
    lpush: async (key, values) => {
      await db.connect();
      await db.lPush(key, values);
      await db.quit();
    },
    lrange: async (key, start, stop) => {
      await db.connect();

      const data = await db.lRange(key, start, stop);
      await db.quit();

      return data;
    },
    del: async (keys) => {
      await db.connect();

      const data = await db.del(keys);
      await db.quit();
      return data;
    },
  };
};
