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

    const weapons = {
      rock: { weakTo: "paper", strongTo: "scissors" },
      paper: { weakTo: "scissors", strongTo: "rock" },
      scissors: { weakTo: "rock", strongTo: "paper" },
    };

    if (player1.option && weapons[player1.option].strongTo === player2.option) {
      // Player 1 won
      this.eventBus.next({
        type: "game-finished",
        payload: {
          targets: rooms[index].players,
          message,
          room: {
            id: rooms[index].id,
            isPrivate: false,
            vacant: false,
            players: [],
          },
          roomId: rooms[index].id,
        },
      });
      return;
    }

    if (player2.option && weapons[player2.option].strongTo === player1.option) {
      // Player 2 won
      this.eventBus.next({
        type: "game-finished",
        payload: {
          targets: rooms[index].players,
          message,
          room: {
            id: rooms[index].id,
            isPrivate: false,
            vacant: false,
            players: [],
          },
          roomId: rooms[index].id,
        },
      });
      return;
    }

    //TIE

    // if (player1.score === 3 || player2.score === 3) {
    //   console.log(rooms[index]);

    //   return;
    // }
  }
}
