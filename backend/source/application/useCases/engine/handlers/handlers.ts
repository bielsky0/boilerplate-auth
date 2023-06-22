import {
  Handlers as HandlersAbs,
  HandlersSet,
  Message,
} from "@domain/interfaces/engine/handlers";

export class Handlers implements HandlersAbs {
  handlers: HandlersSet;

  constructor(handlers: HandlersSet) {
    this.handlers = handlers;
  }

  handle(message: Message) {
    console.log(message);
    if (!this.handlers[message.type]) {
      throw new Error("No handler for message");
    }

    this.handlers[message.type].handle(message);
  }
}
