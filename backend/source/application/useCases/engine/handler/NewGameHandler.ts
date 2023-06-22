import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

export let players: Array<string> = [];

export class NewGameHandler implements Handler {
  eventBus: Subject<unknown>;
  type: string = "new_game_handler";
  handle(message: Message) {
    players.push(message.payload.socketId);

    this.eventBus.next({
      type: "game-created",
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
