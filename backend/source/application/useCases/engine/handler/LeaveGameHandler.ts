import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";
import { players } from "./NewGameHandler";

export class LeaveGameHandler implements Handler {
  eventBus: Subject<unknown>;
  type: string = "leave_game_handler";
  handle(message: Message) {
    const index = players.indexOf(message.payload.socketId);
    players.splice(index, 1);
    this.eventBus.next({
      type: "game-left",
      payload: {
        gameId: "dasdasdasdas",
        targets: players,
        message,
      },
    });
  }

  constructor(eventBus: Subject<unknown>) {
    this.eventBus = eventBus;
  }
}
