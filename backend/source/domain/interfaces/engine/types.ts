export enum HandlerType {
  ADD_TO_ROOM = "addToRoom",
  MADE_A_PICK = "madeAPick",
  REMOVE_PICK = "removePick",
  LEAVE_ROOM = "leaveRoom",
  FINISH_GAME = "finishGame",
  FINISH_ROUND = "finishRound",
}

export enum EmiterType {
  START_GAME = "startGame",
  OPPONENT_DISCONNECTED = "opponnentDisconnected",
  ROUND_RESULTS = "roundResults",
  OPPONNET_READY = "opponentReady",
  ROOM_IS_AVAILABLE = "roomIsAvailable",
}
