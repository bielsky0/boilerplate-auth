import { PrismaClient } from "@prisma/client";
import * as Interfaces from "@domain/interfaces";
import * as repositories from "./repositories";
import { makePrismaCLient } from "./database/prisma";
import { makeRedisClient } from "./database/redis";

export type Dependencies = {
  userRepository: Interfaces.UserReposiotry;
  cacheRepository: Interfaces.CacheRepository;
  roomRepository: Interfaces.RoomRepository;
  queueRepository: Interfaces.QueueRepository;

};

export async function makeInfrastructure(): Promise<Dependencies> {
  const db: PrismaClient = makePrismaCLient();
  const redisDb = makeRedisClient({
    url: process.env.REDIS_URL,
  });

  const roomPrefix = 'rooms:rockPaperScissors' as const;
  const queuePrefix = 'queue:rockPaperScissors' as const;

  await redisDb.connect();

  return {
    userRepository: repositories.makeUserRepository({ db }),
    cacheRepository: repositories.makeCacheRepository({ db: redisDb }),
    roomRepository: repositories.makeRoomRepository({ db: redisDb, roomPrefix }),
    queueRepository: repositories.makeQueueRepository({ db: redisDb, prefix: queuePrefix })
  };
}
