import { CreateRoomHandler } from "@application/useCases/engine/handler/CreateRoom";
import { JoinRoomHandler } from "@application/useCases/engine/handler/JoinRoom";
import { LeaveGameHandler } from "@application/useCases/engine/handler/LeaveRoom";
import { UpdateRoomHandler } from "@application/useCases/engine/handler/UpdateRoom";
import { Handlers } from "@application/useCases/engine/handlers/handlers";
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
    [HandlerType.CREATE_ROOM]: new CreateRoomHandler(eventBus),
    [HandlerType.JOIN_ROOM]: new JoinRoomHandler(eventBus),
    [HandlerType.LEAVE_ROOM]: new LeaveGameHandler(eventBus),
    [HandlerType.UPDATE_ROOM]: new UpdateRoomHandler(eventBus),
  });

  eventBus.subscribe((message) => {
    message.payload.targets.forEach((id: string) => {
      io.to(id).emit("message", {
        type: message.type,
        payload: message.payload,
      });
    });
  });

  io.on("connection", (socket) => {
    socket.on("message", (message, callback) => {
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
