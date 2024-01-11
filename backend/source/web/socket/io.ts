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
import { WaitForRoomHandler } from "@application/useCases/engine/handler/WaitForRoom";
import { LeaveQueueHandler } from "@application/useCases/engine/handler/LeaveQueue";

export const makeIo = (
  dependencies: Dependencies,
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new SocketServer(server, {
    cors: { origin: "*" },
  });

  const eventBus = new Subject<Message>();

  const { roomRepository, queueRepository } = dependencies

  const handlers = new Handlers({
    [HandlerType.JOIN_ROOM]: new JoinRoomHandler(eventBus, roomRepository),
    [HandlerType.CREATE_ROOM]: new CreateRoomHandler(eventBus, roomRepository),
    [HandlerType.LEAVE_ROOM]: new LeaveRoomHandler(eventBus, roomRepository),
    [HandlerType.MAKE_PICK]: new MakePickHandler(eventBus, roomRepository),
    [HandlerType.WAIT_FOR_ROOM]: new WaitForRoomHandler(eventBus, queueRepository, roomRepository),
    [HandlerType.LEAVE_QUEUE]: new LeaveQueueHandler(eventBus, queueRepository),
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
      try {
        await handlers.handle({
          type: HandlerType.LEAVE_ROOM,
          payload: {
            socketId: socket.id,
          },
        });

        await handlers.handle({
          type: HandlerType.LEAVE_QUEUE,
          payload: {
            socketId: socket.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });
  });

  return io;
};
