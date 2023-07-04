import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";
import { rooms } from "./AddToRoom";

export class GameFinishedHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }

  handle(message: HandlerMessage) {
    console.log(message.payload.room.players, "dasdasdasd");
    const index = rooms.findIndex((room) => room.id === message.payload.roomId);

    if (index < 0) throw Error("Room doesnt exist");

    //check for winner
    const [player1, player2] = rooms[index].players;

    // if (player1.score === 3 || player2.score === 3) {
    //   console.log(rooms[index]);

    //   this.eventBus.next({
    //     type: "game-finished",
    //     payload: {
    //       targets: rooms[index].players,
    //       message,
    //       room: {
    //         id: rooms[index].id,
    //         isPrivate: false,
    //         vacant: false,
    //         players: [],
    //       },
    //       roomId: rooms[index].id,
    //     },
    //   });

    //   return;
    // }
  }
}
