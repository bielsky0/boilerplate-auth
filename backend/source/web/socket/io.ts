import { AddToRoomHandler } from "@application/useCases/engine/handler/AddToRoom";
import { FinishRoundHandler } from "@application/useCases/engine/handler/FinishRound";
import { GameFinishedHandler } from "@application/useCases/engine/handler/GameFinished";
import { LeaveGameHandler } from "@application/useCases/engine/handler/LeaveRoom";
import { MadeAPickHandler } from "@application/useCases/engine/handler/MadeAPick";
import { Handlers } from "@application/useCases/engine/handlers/handlers";
import { Player } from "@domain/entities/player/types";
import { Message } from "@domain/interfaces/engine/emiters";
import { HandlerType } from "@domain/interfaces/engine/types";
import { Dependencies } from "@web/crosscutting/container";
import { IncomingMessage, ServerResponse, Server } from "http";
import { Subject } from "rxjs";
import { Server as SocketServer } from "socket.io";

export const makeIo = (
  dependencies: Dependencies,
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new SocketServer(server, {
    cors: { origin: "*" },
  });

  const eventBus = new Subject<Message>();

  const handlers = new Handlers({
    [HandlerType.ADD_TO_ROOM]: new AddToRoomHandler(eventBus),
    [HandlerType.FINISH_GAME]: new AddToRoomHandler(eventBus),
    [HandlerType.LEAVE_ROOM]: new LeaveGameHandler(eventBus),
    [HandlerType.REMOVE_PICK]: new AddToRoomHandler(eventBus),
    [HandlerType.MADE_A_PICK]: new MadeAPickHandler(eventBus),
    [HandlerType.FINISH_ROUND]: new FinishRoundHandler(eventBus),
  });

  eventBus.subscribe((message) => {
    try {
      console.log(message);
      message.payload.targets.forEach(({ id }: { id: string }) => {
        io.to(id).emit("rockPaperSicssors", {
          type: message.type,
          payload: message.payload,
        });
      });
    } catch (err) {
      console.log(err);
    }
  });

  io.on("connection", (socket) => {
    socket.on("rockPaperSicssors", (message) => {
      try {
        handlers.handle({
          ...message,
          payload: {
            ...message.payload,
            socketId: socket.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      handlers.handle({
        type: HandlerType.LEAVE_ROOM,
        payload: {
          socketId: socket.id,
        },
      });
    });
  });

  return io;
};
