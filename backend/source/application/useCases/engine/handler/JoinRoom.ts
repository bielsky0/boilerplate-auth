import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";
import { rooms } from "./CreateRoom";

export class JoinRoomHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }

  handle(message: HandlerMessage) {
    const index = rooms.findIndex(
      (room) => room.roomId === message.payload.roomId
    );

    if (index < 0) throw Error("Romm doesnt exist");

    const room = rooms[index];

    const ddd = room.players.find(
      (playerId: string) => playerId === message.payload.socketId
    );

    if (ddd) return;

    room.players.push(message.payload.socketId);

    this.eventBus.next({
      type: "player-joined",
      payload: {
        targets: room.players,
        message,
        room: room,
        roomId: room.roomId,
      },
    });
  }
}
