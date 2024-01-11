import { Room } from "@domain/entities/room";
import { RoomRepository } from "@domain/interfaces/repositories/RoomRepository";
import { RedisClientType } from "@infrastructure/database/redis";

export type MakeRoomRepositoryDependencies = {
    db: RedisClientType;
    roomPrefix: string
};

export const makeRoomRepository = ({
    db,
    roomPrefix
}: MakeRoomRepositoryDependencies): RoomRepository => {

    return {
        async setRoom(value: Room) {

            await db.hSet(roomPrefix, value.id, JSON.stringify(value));

        },

        async getRoom(key: string) {

            const room = await db.hGet(roomPrefix, key);

            if (!room) return null;

            return JSON.parse(room);
        },
        async getAllRooms() {
            try {

                const rooms = await db.hGetAll(roomPrefix);

                const parsedRooms = Object.values(rooms).map((unparsedRoom) => JSON.parse(unparsedRoom) as Room);


                return parsedRooms
            } catch (err) {
                console.log(err, 'errrr')
                return []
            }
        },
        async removeRoom(key: string) {

            await db.hDel(roomPrefix, key);

        },
        async removePlayer(playerId: string) {

            const rooms = await db.hGetAll(roomPrefix);

            const parsedRooms = Object.values(rooms).map((unparsedRoom) => JSON.parse(unparsedRoom) as Room);

            const playerRooms = parsedRooms.filter(({ players }) => {
                return players.some(({ id }) => id === playerId);
            });

            if (playerRooms.length > 0) {

                await Promise.all(playerRooms.map(async (room) => {
                    const { players, id } = room;
                    const index = players.findIndex((player) => player.id === playerId);
                    if (index > -1) {
                        players.splice(index, 1);

                        if (players.length < 2) {
                            room.roomIsAvaible = true;
                            room.roomIsFull = false;
                        }

                        await db.hSet(roomPrefix, id, JSON.stringify(room));
                    }

                }));
            }


            return playerRooms;
        }
    };
};
