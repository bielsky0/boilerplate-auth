import { Subject } from "rxjs";

export interface Handlers {
  handlers: HandlersSet;
  handle: (data: Message) => void;
}

export type HandlersSet = {
  [key: string]: Handler;
};

export interface Handler {
  eventBus: Subject<unknown>;
  type: string;
  handle: (data: Message) => void;
}

export interface Message {
  type: string;
  payload: Payload;
}

export type Payload = {
  [key: string]: any;
};
