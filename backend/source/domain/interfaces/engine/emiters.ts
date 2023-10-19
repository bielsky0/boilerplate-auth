import { Subject } from "rxjs";
import { EmiterType } from "./types";
import { SanitizeRoom } from "@domain/entities/room";

export interface Emiters {
  emiters: EmitersSet;
  emit: (data: Message) => void;
}

export type EmitersSet = {
  [key: string]: Emiter;
};

export interface Emiter {
  eventBus: Subject<Message>;
  emit: (data: Message) => void;
}

export type BasePayload<T> = T & {
  targets: { id: string }[],
  roomId: string,
}
export type RoomNotExistsPayload = { roomId: string };
export type RoomIsFullPayload = { roomId: string };
export type UpdatePlayersPayload = {
  room: SanitizeRoom
};
export type StartGamePayload = {
  room: SanitizeRoom
};
export type UpdatePickPayload = {
  room: SanitizeRoom
};
export type FinishRoundPayload = {
  room: SanitizeRoom
};
export type FinishGamePayload = {
  room: SanitizeRoom
};
export type CreateRoomPayload = {
  room: SanitizeRoom
};
export type PlayerLeftPayload = {
  room: SanitizeRoom
};



export type EmiterValMapper<T extends EmiterType> =
  T extends EmiterType.CREATE_ROOM ? CreateRoomPayload :
  T extends EmiterType.FINISH_GAME ? FinishGamePayload :
  T extends EmiterType.FINISH_ROUND ? FinishRoundPayload :
  T extends EmiterType.UPDATE_PICK ? UpdatePickPayload :
  T extends EmiterType.PLAYER_LEFT ? PlayerLeftPayload :
  T extends EmiterType.ROOM_IS_FULL ? RoomIsFullPayload :
  T extends EmiterType.ROOM_NOT_EXIST ? RoomNotExistsPayload :
  T extends EmiterType.START_GAME ? StartGamePayload :
  T extends EmiterType.UPDATE_PLAYERS ? UpdatePlayersPayload :
  never;

export type AllTogetherImpl<T extends EmiterType = EmiterType> = {
  type: T;
  payload: BasePayload<EmiterValMapper<T>>;
}

export type Message = EmiterType extends infer U
  ? U extends EmiterType
  ? AllTogetherImpl<U>
  : never
  : never;