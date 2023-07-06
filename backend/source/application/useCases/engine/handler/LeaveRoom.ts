import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, sanitizeRoom } from "./AddToRoom";

export class LeaveGameHandler implements Handler {
  eventBus: Subject<EmiterMessage>;
  handle(message: HandlerMessage) {
    const romms = rooms.filter(({ players }) => {
      return players.some(({ id }) => id === message.payload.socketId);
    });

    romms.forEach(({ players }) => {
      const index = players.indexOf(message.payload.socketId);
      players.splice(index, 1);
    });

    romms.forEach((room) => {
      this.eventBus.next({
        type: "opponnentDisconnected",
        payload: {
          roomId: room.id,
          room: sanitizeRoom(room),
          targets: room.players,
          message,
        },
      });
    });
  }

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }
}
