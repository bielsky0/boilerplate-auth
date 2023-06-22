import { Subject } from "rxjs";
import { makeContainer } from "../crosscutting/container";

import { makeApp } from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { Handlers } from "@application/useCases/engine/handlers/handlers";
import { LeaveGameHandler } from "@application/useCases/engine/handler/LeaveGameHandler";
import { NewGameHandler } from "@application/useCases/engine/handler/NewGameHandler";

const dependencies = makeContainer();

const PORT = Number(process.env.PORT);

const app = makeApp(dependencies);

const server = createServer(app);

const io = new Server(server);

const eventBus = new Subject<any>();

const handlers = new Handlers({
  ["new_game_handler"]: new NewGameHandler(eventBus),
  ["leave_game_handler"]: new LeaveGameHandler(eventBus),
});

eventBus.subscribe((message) => {
  console.log(message.payload);
  message.payload.targets.forEach((id: string) => {
    io.to(id).emit("message", {
      type: message.type,
      payload: message.payload,
    });
  });
});

io.on("connection", (socket) => {
  socket.on("new_game_handler", (message) => {
    handlers.handle({
      type: "new_game_handler",
      payload: {
        message,
        socketId: socket.id,
      },
    });
  });

  socket.on("disconnect", () => {
    handlers.handle({
      type: "leave_game_handler",
      payload: {
        socketId: socket.id,
      },
    });
  });
});

server.listen(PORT, function applicationStarted() {
  console.log("App started on port ", PORT);
});
