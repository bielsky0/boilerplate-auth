import { useContext } from "react";
import { SocketContext } from "../../store/socket/socket.context";

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) throw new Error("SocketContext used outside of Provider");

    return context;
}