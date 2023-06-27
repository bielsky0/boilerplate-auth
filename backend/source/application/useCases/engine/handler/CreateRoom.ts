import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

//TODO: Make it stateless
type Room = {
  [key: string]: any;
};
export let players: Array<string> = [];
export let rooms: Array<Room> = [];

export class CreateRoomHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }

  handle(message: HandlerMessage) {
    players.push(message.payload.socketId);

    const newRoom: Room = {
      roomId: `${Math.random()}`,
      players: [],
      data: "xd",
    };

    newRoom.players.push(message.payload.socketId);

    rooms.push(newRoom);

    this.eventBus.next({
      type: "game-created",
      payload: {
        targets: newRoom.players,
        message,
        room: newRoom,
        roomId: newRoom.roomId,
      },
    });
  }
}

export const makeCreateRoomHandler = () => {};
