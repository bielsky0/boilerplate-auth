import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
    Handler,
    Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { sanitizeRoom } from "./CreateRoom";
import { EmiterType } from "@domain/interfaces/engine/types";
import { RoomRepository } from "@domain/interfaces";

export class LeaveRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    roomRepository: RoomRepository;

    constructor(eventBus: Subject<EmiterMessage>, roomRepository: RoomRepository) {
        this.eventBus = eventBus;
        this.roomRepository = roomRepository;
    }

    async handle(message: HandlerMessage) {
        const { socketId: playerId } = message.payload

        const playerRooms = await this.roomRepository.removePlayer(playerId);

        playerRooms.forEach((room) => {
            this.eventBus.next({
                type: EmiterType.PLAYER_LEFT,
                payload: {
                    roomId: room.id,
                    room: sanitizeRoom(room),
                    targets: room.players,
                },
            });
        });
    }
}
