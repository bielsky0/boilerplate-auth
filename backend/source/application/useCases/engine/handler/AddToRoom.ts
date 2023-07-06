import { Player, SanitizePlayer } from "@domain/entities/player/types";
import { Room, SanitizeRoom } from "@domain/entities/room/types";
import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
  Handler,
  Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

type Payload = {
  roomId: string;
  socketId: string;
};
export const rooms: Room[] = [];

export const sanitizePlayer = (player: Player): SanitizePlayer => ({
  id: player.id,
  isOptionPicked: player.isOptionPicked,
  score: player.score,
});

export const sanitizeRoom = (room: Room): SanitizeRoom => ({
  ...room,
  players: room.players.map((player) => sanitizePlayer(player)),
});

export class AddToRoomHandler implements Handler {
  eventBus: Subject<EmiterMessage>;

  constructor(eventBus: Subject<EmiterMessage>) {
    this.eventBus = eventBus;
  }

  handle(message: HandlerMessage) {
    const payload = message.payload as Payload;
    const index = rooms.findIndex((room) => room.id === payload.roomId);
    if (index < 0) {
      const newRoom: Room = {
        id: payload.roomId,
        roomIsAvaible: true,
        roomIsFull: false,
        players: [],
        roundIsOver: false,
        opponentReady: false,
        roundResults: {
          verdict: "tie",
          opponentPick: "none",
        },
      };

      newRoom.players.push({
        id: payload.socketId,
        score: 0,
        isOptionPicked: false,
        option: null,
      });

      rooms.push(newRoom);

      this.eventBus.next({
        type: "roomIsAvailable",
        payload: {
          targets: newRoom.players,
          room: sanitizeRoom(newRoom),
          roomIsAvailable: true,
          roomId: newRoom.id,
        },
      });

      return;
    }

    if (rooms[index].players.length >= 2) {
      rooms[index].roomIsAvaible = false;
      rooms[index].roomIsFull = true;

      this.eventBus.next({
        type: "roomIsFull",
        payload: {
          targets: [payload.socketId],
          room: {
            roomId: rooms[index].id,
          },
          roomId: payload.roomId,
        },
      });

      return;
    }

    rooms[index].players.push({
      id: payload.socketId,
      score: 0,
      isOptionPicked: false,
      option: null,
    });

    if (rooms[index].players.length >= 2) {
      rooms[index].roomIsAvaible = false;
      this.eventBus.next({
        type: "startGame",
        payload: {
          targets: rooms[index].players,
          room: sanitizeRoom(rooms[index]),
          roomId: rooms[index].id,
        },
      });
      return;
    }

    rooms[index].roomIsAvaible = true;

    this.eventBus.next({
      type: "roomIsAvailable",
      payload: {
        targets: rooms[index].players,
        room: sanitizeRoom(rooms[index]),
        roomId: rooms[index].id,
      },
    });
  }
}
