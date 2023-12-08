import { Room } from "@domain/entities/room";
import { RoomRepository } from "@domain/interfaces/repositories/RoomRepository";
import { RedisClientType } from "@infrastructure/database/redis";

export type MakeRoomRepositoryDependencies = {
    db: RedisClientType;
};

export const makeRoomRepository = ({
    db,
}: MakeRoomRepositoryDependencies): RoomRepository => {
    const roomPrefix = 'rooms:rockPaperScissors' as const;

    return {
        async setRoom(value: Room) {
            await db.connect();

            await db.hSet(roomPrefix, value.id, JSON.stringify(value));

            await db.quit();
        },

        async getRoom(key: string) {
            await db.connect();

            const room = await db.hGet(roomPrefix, key);

            await db.quit();

            if (!room) return null;

            return JSON.parse(room);
        },
        async getAllRooms() {
            try {
                await db.connect();

                console.log('getAllRooms');

                console.log(await db.type(roomPrefix));

                const rooms = await db.hGetAll(roomPrefix);

                console.log(rooms, 'rooms')

                const parsedRooms = Object.values(rooms).map((unparsedRoom) => JSON.parse(unparsedRoom) as Room);

                await db.quit();

                return parsedRooms
            } catch (err) {
                console.log(err, 'errrr')
                return []
            }
        },
        async removeRoom(key: string) {
            await db.connect();

            await db.hDel(roomPrefix, key);

            await db.quit();
        },
    };
};
