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

    const currentPlayer = rooms[index].players.find(
      ({ id }) => id === payload.socketId
    );

    const isGameOver =
      rooms[index].players.some(({ score }) => score >= 3) ||
      rooms[index].isGameOver;

    if (isGameOver) {
      rooms[index].isGameOver = true;
      if (currentPlayer) {
        const isWinner = rooms[index].players.every(
          ({ score }) => score < currentPlayer.score && currentPlayer.score >= 3
        );

        if (isWinner) {
          rooms[index].players = rooms[index].players.filter(
            ({ id }) => id !== currentPlayer.id
          );
          this.eventBus.next({
            type: "finishGame",
            payload: {
              targets: [currentPlayer],
              room: {
                ...sanitizeRoom(rooms[index]),
                roundIsOver: false,
                isGameOver: true,
              },
              roomId: rooms[index].id,
            },
          });

          return;
        }
        rooms[index].players = rooms[index].players.filter(
          ({ id }) => id !== currentPlayer.id
        );
        this.eventBus.next({
          type: "finishGame",
          payload: {
            targets: [currentPlayer],
            room: {
              ...sanitizeRoom(rooms[index]),
              roundIsOver: false,
              isGameOver: true,
            },
            roomId: rooms[index].id,
          },
        });

        return;
      }
    }

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
