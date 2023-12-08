import { JoinRoomHandler } from "@application/useCases/engine/handler/JoinRoom";
import { CreateRoomHandler } from "@application/useCases/engine/handler/CreateRoom";
import { LeaveRoomHandler } from "@application/useCases/engine/handler/LeaveGame";
import { MakePickHandler } from "@application/useCases/engine/handler/MakePick";
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

  const { roomRepository } = dependencies

  const handlers = new Handlers({
    [HandlerType.JOIN_ROOM]: new JoinRoomHandler(eventBus, roomRepository),
    [HandlerType.CREATE_ROOM]: new CreateRoomHandler(eventBus, roomRepository),
    [HandlerType.LEAVE_ROOM]: new LeaveRoomHandler(eventBus, roomRepository),
    [HandlerType.MAKE_PICK]: new MakePickHandler(eventBus, roomRepository),
  });

  eventBus.subscribe((message) => {
    try {
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
    socket.on("rockPaperSicssors", async (message) => {
      try {
        await handlers.handle({
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

    socket.on("disconnect", async () => {
      await handlers.handle({
        type: HandlerType.LEAVE_ROOM,
        payload: {
          socketId: socket.id,
        },
      });
    });
  });

  return io;
};
