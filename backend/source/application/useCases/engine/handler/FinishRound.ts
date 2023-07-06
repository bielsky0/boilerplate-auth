import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, sanitizeRoom } from "./AddToRoom";

type Payload = {
  roomId: string;
  socketId: string;
};

export class FinishRoundHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }
  handle(message: HandlerMessage) {
    const payload = message.payload as Payload;

    const index = rooms.findIndex((room) => room.id === payload.roomId);

    if (index < 0) throw Error(`Room ${payload.roomId} dosent exists`);

    rooms[index].players = rooms[index].players.map((p) => ({
      ...p,
      option: null,
      isOptionPicked: false,
    }));

    this.eventBus.next({
      type: "startRound",
      payload: {
        targets: rooms[index].players,
        room: {
          ...sanitizeRoom(rooms[index]),
          roundIsOver: false,
        },
        roomId: rooms[index].id,
      },
    });

    console.log(message, "FinishRoundHandler");
  }
}
