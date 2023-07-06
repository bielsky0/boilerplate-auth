import {
  Handler,
  HandlersSet,
  HandlerMessage,
  SocketActions,
  SocketAction,
} from ".";

export class Handlers implements Handler {
  handlers: HandlersSet;

  constructor(handlers: HandlersSet) {
    this.handlers = handlers;
  }

  handle(message: HandlerMessage) {
    console.log(message, "Handlers");
    if (!this.handlers[message.type]) {
      throw new Error("No handler for message");
    }

    this.handlers[message.type].handle(message);
  }
}

export class RoomIsAvaiableHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: message.payload.room,
    });

    console.log(message, "RoomIsAvaiableHandler");
  }
}

export class RoomIsFullHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    console.log(message.payload.room);
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roomIsFull: true,
      },
    });

    console.log(message, "RoomIsFullHandler");
  }
}

export class OpponnentDisconnectedHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roomIsFull: false,
        roomIsAvaible: true,
      },
    });

    console.log(message, "OpponnentDisconnectedHandler");
  }
}

export class OpponnetReadydHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roomIsFull: false,
        opponentReady: true,
      },
    });

    console.log(message, "OpponnetReadydHandler");
  }
}

export class RoundResultsdHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roomIsFull: false,
        roundIsOver: true,
      },
    });

    console.log(message, "RoundResultsdHandler");
  }
}

export class StartGamedHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roomIsFull: false,
        roundIsOver: false,
      },
    });

    console.log(message, "StartGamedHandler");
  }
}

export class StartRoundHandler implements Handler {
  dispatch: React.Dispatch<SocketActions>;

  constructor(dispatch: React.Dispatch<SocketActions>) {
    this.dispatch = dispatch;
  }

  handle(message: HandlerMessage) {
    this.dispatch({
      type: SocketAction.SET_ROOM,
      payload: {
        ...message.payload.room,
        roundIsOver: false,
      },
    });

    console.log(message, "StartGamedHandler");
  }
}
