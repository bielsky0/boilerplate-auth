import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export enum HandlerType {
  START_GAME = "startGame",
  OPPONENT_DISCONNECTED = "opponnentDisconnected",
  ROUND_RESULTS = "roundResult",
  OPPONNET_READY = "opponentReady",
  ROOM_IS_AVAILABLE = "roomIsAvailable",
  ROOM_IS_FULL = "roomIsFull",
  START_ROUND = "startRound",
}

export enum EmiterType {
  ADD_TO_ROOM = "addToRoom",
  MADE_A_PICK = "madeAPick",
  REMOVE_PICK = "removePick",
  FINISH_GAME = "finishGame",
  FINISH_ROUND = "finishRound",
}

export interface HandlerMessage {
  type: HandlerType;
  payload: {
    room: Room;
  };
}

export interface EmitterMessage {
  type: EmiterType;
  payload: EmiterPayload;
}
export type EmiterPayload = {
  [key: string]: any;
};
export interface Room {
  id: string;
  players: Player[];
  roomIsAvaible: true;
  roundIsOver: boolean;
  roundResults?: { verdict: string; opponentPick: string };
  roomIsFull: boolean;
  opponentReady: boolean;
}

export interface Player {
  isOptionPicked: boolean;
  score: number;
  id: string;
}

export enum Pick {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export type Payload = {
  room: Room;
};

export type ServerToClientEvents = {
  rockPaperSicssors: (message: HandlerMessage) => void;
};

export type ClientToServerEvents = {
  rockPaperSicssors: (message: EmitterMessage) => void;
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
  [SocketAction.SET_ROOM]: Room;
};

export type SocketProviderProps = {
  children: ReactNode;
};

export type SocketActions =
  ActionMap<SocketPayload>[keyof ActionMap<SocketPayload>];

export interface Handlers {
  handlers: HandlersSet;
  handle: (data: HandlerMessage) => void;
}

export type HandlersSet = {
  [key in HandlerType]: Handler;
};

export interface Handler {
  handle: (data: HandlerMessage) => void;
}
