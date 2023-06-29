import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, players } from "./CreateRoom";

export class LeaveGameHandler implements Handler {
  eventBus: Subject<EmiterMessage>;
  handle(message: HandlerMessage) {
    const index = players.indexOf(message.payload.socketId);
    players.splice(index, 1);
    this.eventBus.next({
      type: "game-xDDDDDDDDDDDDDDDD",
      payload: {
        roomId: "dasdasdasdas",
        room: {},
        targets: players,
        message,
      },
    });
  }

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }
}
