
export enum HandlerType {
  JOIN_ROOM = 'joinRoom',
  MAKE_PICK = 'makePick',
  LEAVE_ROOM = 'leaveRoom',
  CREATE_ROOM = "createRoom",
}

export enum EmiterType {
  ROOM_NOT_EXIST = 'roomNotExists',
  ROOM_IS_FULL = 'roomIsFull',
  UPDATE_PLAYERS = 'updatePlayers',
  START_GAME = 'startGame',
  UPDATE_PICK = 'updatePick',
  FINISH_ROUND = 'finishRound',
  FINISH_GAME = 'finishGame',
  CREATE_ROOM = 'createRoom',
  PLAYER_LEFT = 'playerLeft'
}

