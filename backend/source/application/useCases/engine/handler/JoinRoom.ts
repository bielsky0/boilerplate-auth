import { Subject } from "rxjs";

import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { rooms, sanitizeRoom } from "./CreateRoom";
import { EmiterType } from "@domain/interfaces/engine/types";

type Payload = {
    roomId: string;
    socketId: string;
};

export class JoinRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;

    constructor(eventBus: Subject<EmiterMessage>) {
        this.eventBus = eventBus;
    }


    handle(message: Message) {
        const payload = message.payload as Payload;

        const index = rooms.findIndex((room) => room.id === payload.roomId);


        // room doesn't exist
        if (index < 0) {
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
        if (rooms[index].players.length === 2) {
            this.eventBus.next({
                type: EmiterType.ROOM_IS_FULL,
                payload: {
                    targets: [{ id: payload.socketId }],
                    roomId: payload.roomId,
                },
            });

            return;
        }

        rooms[index].players.push({
            id: payload.socketId,
            score: 0,
            isOptionPicked: false,
            option: null,
        });

        //start game if players are enough
        if (rooms[index].players.length >= 2) {
            rooms[index].roomIsAvaible = false;
            this.eventBus.next({
                type: EmiterType.START_GAME,
                payload: {
                    targets: rooms[index].players,
                    room: sanitizeRoom(rooms[index]),
                    roomId: rooms[index].id,
                },
            });

            return;
        }

        //send information about updated players
        // if players max length is 2 it will only send information to current player
        this.eventBus.next({
            type: EmiterType.UPDATE_PLAYERS,
            payload: {
                targets: rooms[index].players,
                room: sanitizeRoom(rooms[index]),
                roomId: rooms[index].id,
            },
        });
    };
}   