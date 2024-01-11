import { HandlerMessage, HandlerType, SocketState, Emiter, EmiterType } from ".";

export const socketReducer = (
  state: SocketState,
  { type, payload }: HandlerMessage | Emiter
): SocketState => {
  switch (type) {
    case HandlerType.CREATE_ROOM:
      return { ...state, room: payload.room };
    case HandlerType.FINISH_GAME:
      return { ...state, room: undefined, gameOver: { isGameOver: true, players: payload.room.players } };
    case HandlerType.FINISH_ROUND:
      return { ...state, room: payload.room };
    case HandlerType.PLAYER_LEFT:
      return { ...state, room: payload.room };
    case HandlerType.ROOM_IS_FULL:
      return { ...state, room: payload.room };
    case HandlerType.ROOM_NOT_EXIST:
      return { ...state, room: payload.room };
    case HandlerType.START_GAME:
      return { ...state, room: payload.room, yourPick: undefined };
    case HandlerType.UPDATE_PICK:
      return { ...state, room: payload.room };
    case HandlerType.UPDATE_PLAYERS:
      return { ...state, room: payload.room };
    case EmiterType.MAKE_PICK:
      return { ...state, yourPick: payload.pick };
    case EmiterType.JOIN_ROOM:
      return { ...state };
    case EmiterType.LEAVE_ROOM:
      return { ...state };
    case EmiterType.CREATE_ROOM:
      return { ...state };
    case EmiterType.WAIT_FOR_ROOM:
      return { ...state };
    default:
      throw new Error(`Cannot resolve reducer action type ${type}`);
  }
};
