import React from "react";
import { io } from "socket.io-client";
import { SocketActions, SocketState } from ".";

export const initialState: SocketState = {
  socket: io("ws://localhost:5000"),
  room: {},
};

export const SocketContext = React.createContext<{
  socketState: SocketState;
  dispatch: React.Dispatch<SocketActions>;
}>({
  socketState: initialState,
  dispatch: () => undefined,
});
