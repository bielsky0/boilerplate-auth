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

  async handle(message: Message) {
    console.log(message, "Handlers");
    if (!this.handlers[message.type]) {
      throw new Error("No handler for message");
    }

    await this.handlers[message.type].handle(message);
  }
}
