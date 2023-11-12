import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, Emiter, HandlerMessage, ServerToClientEvents } from "../store";

export default class SocketService {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;

    #handlerCallback = (message: HandlerMessage) => { };

    constructor({ url }: { url: string }) {
        this.socket = io(url);
    }

    onEventResponse(cb: (message: HandlerMessage) => void) {
        this.#handlerCallback = cb;
        this.#addListener();
    }

    #addListener = () => {
        this.socket.on('rockPaperSicssors', (message) => this.#handlerCallback?.(message));
    };

    sentEvent = (data: Emiter) => {
        this.socket.emit('rockPaperSicssors', data);
    };

    getSocket() {
        return this.socket;
    }
}