import { QueueRepository } from "@domain/interfaces/repositories/QueueRepository";
import { RedisClientType } from "@infrastructure/database/redis";

export type MakeQueueRepositoryDependencies = {
    db: RedisClientType;
    prefix: string
};

export const makeQueueRepository = ({
    db,
    prefix
}: MakeQueueRepositoryDependencies): QueueRepository => {

    return {
        async addPlayer(id: string) {

            await db.hSet(prefix, id, id);

        },

        async removePlayer(key: string) {
            try {

                await db.hDel(prefix, key);

            } catch (err) {
                console.log(err, 'removePlayer from queue')
            }
        },

        async getPlayer(withoutId) {

            const playersId = await db.hGetAll(prefix);


            const filteredPlayersId = Object.values(playersId).filter((playerId) => withoutId !== playerId);
            if (filteredPlayersId.length > 0) {

                const randomPlayerId = filteredPlayersId[Math.floor(Math.random() * filteredPlayersId.length)]
                return randomPlayerId

            }

            return undefined
        },
    };
};
