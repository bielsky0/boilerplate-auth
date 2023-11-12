import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
    Handler,
    Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, sanitizeRoom } from "./CreateRoom";
import { EmiterType } from "@domain/interfaces/engine/types";

export class LeaveRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;

    constructor(eventBus: Subject<EmiterMessage>) {
        this.eventBus = eventBus;
    }

    handle(message: HandlerMessage) {
        const { socketId: playerId } = message.payload

        const playerRooms = rooms.filter(({ players }) => {
            return players.some(({ id }) => id === playerId);
        });

        playerRooms.forEach(({ players }) => {
            const index = players.indexOf(playerId);
            players.splice(index, 1);
        });

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
