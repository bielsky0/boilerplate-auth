import { Subject } from "rxjs";

import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { sanitizeRoom } from "./CreateRoom";
import { EmiterType } from "@domain/interfaces/engine/types";
import { RoomRepository } from "@domain/interfaces";

type Payload = {
    roomId: string;
    socketId: string;
};

export class JoinRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    roomRepository: RoomRepository;

    constructor(eventBus: Subject<EmiterMessage>, roomRepository: RoomRepository) {
        this.eventBus = eventBus;
        this.roomRepository = roomRepository;
    }

    async handle(message: Message) {
        const payload = message.payload as Payload;

        const room = await this.roomRepository.getRoom(payload.roomId)

        // room doesn't exist
        if (!room) {
            this.eventBus.next({
                type: EmiterType.ROOM_NOT_EXIST,
                payload: {
                    targets: [{ id: payload.socketId }],
                    roomId: payload.roomId,
                },
            });
            return
        }

        // room is full
        if (room.players.length === 2) {
            this.eventBus.next({
                type: EmiterType.ROOM_IS_FULL,
                payload: {
                    targets: [{ id: payload.socketId }],
                    roomId: payload.roomId,
                },
            });

            return;
        }

        room.players.push({
            id: payload.socketId,
            score: 0,
            isOptionPicked: false,
            option: null,
            isWaitingForRoom: false,
        });


        //start game if players are enough
        if (room.players.length >= 2) {
            room.roomIsAvaible = false;
            await this.roomRepository.setRoom(room);

            this.eventBus.next({
                type: EmiterType.START_GAME,
                payload: {
                    targets: room.players,
                    room: sanitizeRoom(room),
                    roomId: room.id,
                },
            });

            return;
        }

        //send information about updated players
        // if players max length is 2 it will only send information to current player
        await this.roomRepository.setRoom(room);

        this.eventBus.next({
            type: EmiterType.UPDATE_PLAYERS,
            payload: {
                targets: room.players,
                room: sanitizeRoom(room),
                roomId: room.id,
            },
        });
    };
}   