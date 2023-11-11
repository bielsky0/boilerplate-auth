import { useContext } from "react";
import { SocketContext } from "../../store/socket/socket.context";

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) throw new Error("SocketContext used outside of Provider");

    const { data, socket: { id: currentId } } = context;

    const currentPlayer = data.room?.players.find(({ id }) => id === currentId);

    const opponents = data.room?.players.filter(({ id }) => id !== currentId);

    return { ...context, currentPlayer, opponents };
}