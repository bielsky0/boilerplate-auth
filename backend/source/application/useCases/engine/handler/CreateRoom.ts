import { Subject } from "rxjs";

import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { Room, SanitizeRoom } from "@domain/entities/room/types";
import { Player, SanitizePlayer } from "@domain/entities/player/types";
import { EmiterType } from "@domain/interfaces/engine/types";
import crypto from 'crypto'
import { RoomRepository } from "@domain/interfaces";

type Payload = {
    roomId: string;
    socketId: string;
};

export const sanitizePlayer = (player: Player): SanitizePlayer => ({
    id: player.id,
    isOptionPicked: player.isOptionPicked,
    score: player.score,
});

export const sanitizeRoom = (room: Room): SanitizeRoom => ({
    ...room,
    players: room.players.map((player) => sanitizePlayer(player)),
});



export class CreateRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    roomRepository: RoomRepository;

    constructor(eventBus: Subject<EmiterMessage>, roomRepository: RoomRepository) {
        this.eventBus = eventBus;
        this.roomRepository = roomRepository;
    }

    async handle(message: Message) {
        const payload = message.payload as Payload;

        const newRoom: Room = {
            id: crypto.randomUUID(),
            roomIsFull: false,
            players: [],
            roomIsAvaible: true,
            roundIsOver: false,
            isGameOver: false,
        };

        newRoom.players.push({
            id: payload.socketId,
            score: 0,
            isOptionPicked: false,
            option: null,
            isWaitingForRoom: false
        });

        await this.roomRepository.setRoom(newRoom);

        this.eventBus.next({
            type: EmiterType.CREATE_ROOM,
            payload: {
                targets: newRoom.players,
                roomId: newRoom.id,
                room: sanitizeRoom(newRoom)
            },
        });

        return;
    };
}   