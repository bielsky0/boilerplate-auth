import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export enum HandlerType {
  CREATE_ROOM = "createRoom",
  LEAVE_ROOM = "leaveRoom",
  JOIN_ROOM = "joinRoom",
  UPDATE_ROOM = "updateRoom",
}

export interface Message {
  type: HandlerType;
  payload: Payload;
}
export interface Room {
  id: string;
  players: Player[];
  vacant: boolean;
  isPrivate: boolean;
}

export interface Player {
  option: string | null;
  isOptionPicked: boolean;
  score: number;
  id: string;
}

export type Payload = {
  // room?: Room;
  [key: string]: any;
};

export type ServerToClientEvents = {
  rockPaperSicssors: (message: Message) => void;
};

export type ClientToServerEvents = {
  rockPaperSicssors: (message: Message) => void;
};

export type SocketState = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  room?: Room;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum SocketAction {
  SET_ROOM = "setRoom",
}

export type SocketPayload = {
  [SocketAction.SET_ROOM]: object;
};

export type SocketProviderProps = {
  children: ReactNode;
};

export type SocketActions =
  ActionMap<SocketPayload>[keyof ActionMap<SocketPayload>];
