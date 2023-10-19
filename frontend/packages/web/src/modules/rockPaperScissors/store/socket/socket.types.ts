export enum HandlerType {
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

export enum EmiterType {
  JOIN_ROOM = 'joinRoom',
  MAKE_PICK = 'makePick',
  LEAVE_ROOM = 'leaveRoom',
  CREATE_ROOM = "createRoom",
};


export type JoinRoomPayload = {
  roomId: string;
}

export type CreatRoomPayload = null;

export type MakePickPayload = {
  pick: Pick
}

export type LeaveRoomPayload = null;


export type EmiterValMapper<T extends EmiterType> =
  T extends EmiterType.JOIN_ROOM ? JoinRoomPayload :
  T extends EmiterType.CREATE_ROOM ? CreatRoomPayload :
  T extends EmiterType.LEAVE_ROOM ? LeaveRoomPayload :
  T extends EmiterType.MAKE_PICK ? MakePickPayload :
  never;

export type AllTogetherImpl<T extends EmiterType = EmiterType> = {
  type: T;
  payload: EmiterValMapper<T>;
}

export type Emiter = EmiterType extends infer U
  ? U extends EmiterType
  ? AllTogetherImpl<U>
  : never
  : never;

export interface HandlerMessage {
  type: HandlerType;
  payload: {
    room: Room;
  };
}

export type EmitterMessage = Emiter

export type EmiterPayload = {
  [key: string]: any;
};

export type SocketState = {
  room?: Room;
};

export interface Room {
  id: string;
  players: Player[];
  roomIsAvaible: boolean;
  roundIsOver: boolean;
  isGameOver: boolean;
  roundResults?: RoundResults;
  roomIsFull: boolean;
}
export type RoundResults = {
  verdict: Verdict;
  opponentsPick: OpponentPick[]
}

export type OpponentPick = {
  id: string,
  pick: Pick | null
}

export enum Verdict {
  LOSE = 'lose',
  WIN = "win",
  TIE = 'tie'
}


export interface Player {
  isOptionPicked: boolean;
  score: number;
  id: string;
}

export enum Pick {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

export type Payload = {
  room: Room;
};

export type ServerToClientEvents = {
  rockPaperSicssors: (message: HandlerMessage) => void;
};

export type ClientToServerEvents = {
  rockPaperSicssors: (message: EmitterMessage) => void;
};

export interface Handlers {
  handlers: HandlersSet;
  handle: (data: HandlerMessage) => void;
}

export type HandlersSet = {
  [key in HandlerType]: Handler;
};

export interface Handler {
  handle: (data: HandlerMessage, cb: (msg: HandlerMessage) => void) => void;
}
