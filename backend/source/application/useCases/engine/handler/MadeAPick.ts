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
  pick: string;
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

    if (check) {
      const winner = rooms[index].players[0];
      const loser = rooms[index].players[1];
      winner.score += 1;
      this.eventBus.next({
        type: "roundResult",
        payload: {
          targets: [winner],
          room: {
            ...sanitizeRoom(rooms[index]),
            roundResults: { verdict: "win", opponentPick: loser.option },
          },
        },
      });

      this.eventBus.next({
        type: "roundResult",
        payload: {
          roundIsOver: true,
          targets: [loser],
          room: {
            ...sanitizeRoom(rooms[index]),
            roundResults: { verdict: "lose", opponentPick: winner.option },
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
