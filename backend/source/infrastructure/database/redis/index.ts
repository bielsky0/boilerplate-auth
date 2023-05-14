import { createClient } from "redis";

export type RedisClientType = ReturnType<typeof createClient>;
export type RedisClientOptions = Parameters<typeof createClient>[0];

export const makeRedisClient = (
  options: RedisClientOptions
): RedisClientType => {
  return createClient(options);
};
