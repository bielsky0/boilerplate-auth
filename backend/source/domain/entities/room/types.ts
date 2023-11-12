import { Pick, Player, SanitizePlayer } from "../player/types";

export type RoomInput = {
  id: string;
  players: Player[];
  vacant: boolean;
  isPrivate: boolean;
};

export interface Room {
  id: string;
  players: Player[];
  roundIsOver: boolean;
  roundResults?: RoundResults;
  roomIsFull: boolean;
  isGameOver: boolean;
  roomIsAvaible: boolean;
}
export interface SanitizeRoom {
  id: string;
  players: SanitizePlayer[];
  roundIsOver: boolean;
  roundResults?: RoundResults;
  roomIsFull: boolean;
  isGameOver: boolean;
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