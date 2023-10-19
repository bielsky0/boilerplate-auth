import { HandlerMessage, HandlerType, SocketState } from ".";

export const socketReducer = (
  state: SocketState,
  { type, payload }: HandlerMessage
): SocketState => {
  console.log(type, payload)
  switch (type) {
    case HandlerType.CREATE_ROOM:
      return { ...state, room: payload.room };
    case HandlerType.FINISH_GAME:
      return { ...state, room: payload.room };
    case HandlerType.FINISH_ROUND:
      return { ...state, room: payload.room };
    case HandlerType.PLAYER_LEFT:
      return { ...state, room: payload.room };
    case HandlerType.ROOM_IS_FULL:
      return { ...state, room: payload.room };
    case HandlerType.ROOM_NOT_EXIST:
      return { ...state, room: payload.room };
    case HandlerType.START_GAME:
      return { ...state, room: payload.room };
    case HandlerType.UPDATE_PICK:
      return { ...state, room: payload.room };
    case HandlerType.UPDATE_PLAYERS:
      return { ...state, room: payload.room };
    default:
      throw new Error("Cannot resolve reducer action type");
  }
};
