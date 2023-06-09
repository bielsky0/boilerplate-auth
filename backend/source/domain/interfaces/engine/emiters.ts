import { Room } from "@domain/entities/room/types";
import { Subject } from "rxjs";

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

export interface Message {
  type: string;
  payload: Payload;
}

export type Payload = {
  [key: string]: any;
};
