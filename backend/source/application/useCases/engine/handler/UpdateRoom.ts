import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";
import { rooms } from "./CreateRoom";

export class UpdateRoomHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }

  handle(message: HandlerMessage) {
    console.log(message, "dasdasdasd");
    const index = rooms.findIndex(
      (room) => room.roomId === message.payload.roomId
    );

    if (index < 0) throw Error("Room doesnt exist");

    rooms[index] = message.payload.room;

    this.eventBus.next({
      type: "room-updated",
      payload: {
        targets: rooms[index].players,
        message,
        room: rooms[index],
        roomId: rooms[index].roomId,
      },
    });
  }
}
