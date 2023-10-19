import React from "react";
import { ClientToServerEvents, Emiter, ServerToClientEvents, SocketState } from ".";
import { Socket } from "socket.io-client";

type ContextState = {
    data: SocketState;
    sentEvent: (message: Emiter) => void;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}


export const SocketContext = React.createContext<ContextState | undefined>(undefined);
