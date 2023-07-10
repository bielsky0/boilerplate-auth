import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, sanitizeRoom } from "./AddToRoom";
import { Pick } from "@domain/entities/player/types";

type Payload = {
  roomId: string;
  socketId: string;
  pick: Pick;
};
export class MadeAPickHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }
  handle(message: HandlerMessage) {
    const payload = message.payload as Payload;
    const index = rooms.findIndex((room) => room.id === payload.roomId);

    if (index < 0) throw Error(`Room ${payload.roomId} dosent exists`);

    const currentPlayer = rooms[index].players.find(
      ({ id }) => id === payload.socketId
    );

    if (!currentPlayer) throw Error(`Player ${payload.socketId} dosent exists`);

    currentPlayer.isOptionPicked = true;
    currentPlayer.option = payload.pick;

    const check = rooms[index].players.every(
      ({ isOptionPicked }) => isOptionPicked
    );

    const [player1, player2] = rooms[index].players;

    if (check) {
      const weapons = {
        rock: { weakTo: "paper", strongTo: "scissors" },
        paper: { weakTo: "scissors", strongTo: "rock" },
        scissors: { weakTo: "rock", strongTo: "paper" },
      };

      if (
        player1.option &&
        weapons[player1.option].strongTo === player2.option
      ) {
        // Player 1 won
        player1.score += 1;

        this.eventBus.next({
          type: "roundResult",
          payload: {
            targets: [player1],
            room: {
              ...sanitizeRoom(rooms[index]),
              roundResults: { verdict: "win", opponentPick: player2.option },
            },
          },
        });

        this.eventBus.next({
          type: "roundResult",
          payload: {
            roundIsOver: true,
            targets: [player2],
            room: {
              ...sanitizeRoom(rooms[index]),
              roundResults: { verdict: "lose", opponentPick: player1.option },
            },
          },
        });

        return;
      }

      if (
        player2.option &&
        weapons[player2.option].strongTo === player1.option
      ) {
        // Player 2 won
        player2.score += 1;

        this.eventBus.next({
          type: "roundResult",
          payload: {
            targets: [player2],
            roundIsOver: true,
            room: {
              ...sanitizeRoom(rooms[index]),
              roundResults: { verdict: "win", opponentPick: player1.option },
            },
          },
        });

        this.eventBus.next({
          type: "roundResult",
          payload: {
            roundIsOver: true,
            targets: [player1],
            room: {
              ...sanitizeRoom(rooms[index]),
              roundResults: { verdict: "lose", opponentPick: player2.option },
            },
          },
        });

        return;
      }

      this.eventBus.next({
        type: "roundResult",
        payload: {
          targets: [player1],
          roundIsOver: true,
          room: {
            ...sanitizeRoom(rooms[index]),
            roundResults: { verdict: "tie", opponentPick: player2.option },
          },
        },
      });

      this.eventBus.next({
        type: "roundResult",
        payload: {
          roundIsOver: true,
          targets: [player2],
          room: {
            ...sanitizeRoom(rooms[index]),
            roundResults: { verdict: "tie", opponentPick: player1.option },
          },
        },
      });

      return;
    }

    this.eventBus.next({
      type: "opponentReady",
      payload: {
        targets: rooms[index].players,
        room: sanitizeRoom(rooms[index]),
      },
    });
    console.log(message, "MadeAPickHandler");
  }
}
