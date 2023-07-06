import { SocketAction, SocketActions, SocketState } from "./socket.types";

export const socketReducer = (
  state: SocketState,
  { type, payload }: SocketActions
): SocketState => {
  switch (type) {
    case SocketAction.SET_ROOM:
      return { ...state, room: payload };
    default:
      throw new Error("Cannot resolve locales reducer action type");
  }
};
