import { useContext, useEffect } from "react";
import { HandlerType, HandlerMessage, SocketContext } from "../../store";
import {
  RoomIsAvaiableHandler,
  Handlers,
  RoomIsFullHandler,
  OpponnentDisconnectedHandler,
  OpponnetReadydHandler,
  RoundResultsdHandler,
  StartGamedHandler,
  StartRoundHandler,
} from "../../store/socket/socket.handler";

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) throw new Error("SocketContext used outside of Provider");

  const {
    socketState: { socket, room },
    dispatch,
  } = context;

  useEffect(() => {
    const handlers = new Handlers({
      [HandlerType.ROOM_IS_AVAILABLE]: new RoomIsAvaiableHandler(dispatch),
      [HandlerType.OPPONENT_DISCONNECTED]: new OpponnentDisconnectedHandler(
        dispatch
      ),
      [HandlerType.OPPONNET_READY]: new OpponnetReadydHandler(dispatch),
      [HandlerType.ROUND_RESULTS]: new RoundResultsdHandler(dispatch),
      [HandlerType.START_GAME]: new StartGamedHandler(dispatch),
      [HandlerType.ROOM_IS_FULL]: new RoomIsFullHandler(dispatch),
      [HandlerType.START_ROUND]: new StartRoundHandler(dispatch),
    });

    const callback = (message: HandlerMessage) => {
      handlers.handle(message);
    };

    socket.on("rockPaperSicssors", callback);

    return () => {
      socket.off("rockPaperSicssors", callback);
    };
  }, []);

  return { socket, room };
};
