import { Subject } from "rxjs";
import { Message as EmiterMessage } from "./emiters";
import { HandlerType } from "./types";

export interface Handlers {
  handlers: HandlersSet;
  handle: (data: Message) => void;
}

export type HandlersSet = {
  [key in HandlerType]: Handler;
};

export interface Handler {
  eventBus: Subject<EmiterMessage>;
  handle: (data: Message) => void;
}

export interface Message {
  type: HandlerType;
  payload: Payload;
}

export type Payload = {
  [key: string]: any;
};
