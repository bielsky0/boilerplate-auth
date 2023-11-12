
export enum HandlerType {
  JOIN_ROOM = 'joinRoom',
  MAKE_PICK = 'makePick',
  LEAVE_ROOM = 'leaveRoom',
  CREATE_ROOM = "createRoom",
}

export enum EmiterType {
  ROOM_NOT_EXIST = 'onRoomNotExists',
  ROOM_IS_FULL = 'onRoomIsFull',
  UPDATE_PLAYERS = 'onUpdatePlayers',
  START_GAME = 'onStartGame',
  UPDATE_PICK = 'onUpdatePick',
  FINISH_ROUND = 'onFinishRound',
  FINISH_GAME = 'onFinishGame',
  CREATE_ROOM = 'onCreateRoom',
  PLAYER_LEFT = 'onPlayerLeft'
}

