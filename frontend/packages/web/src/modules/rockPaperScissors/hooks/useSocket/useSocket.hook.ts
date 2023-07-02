import { useContext, useEffect } from "react";
import { Message, SocketAction, SocketContext } from "../../store";

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) throw new Error("SocketContext used outside of Provider");

  const {
    socketState: { socket, room },
    dispatch,
  } = context;
  console.log(socket.id);
  useEffect(() => {
    const callback = (message: Message) => {
      console.log(message, "dasdasdadasds");
      dispatch({ type: SocketAction.SET_ROOM, payload: message.payload.room });
    };

    socket.on("rockPaperSicssors", callback);

    return () => {
      socket.off("rockPaperSicssors", callback);
    };
  }, [socket]);

  return { socket, room };
};
