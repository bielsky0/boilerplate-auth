import { Player, SanitizePlayer } from "../player/types";

export type RoomInput = {
  id: string;
  players: Player[];
  vacant: boolean;
  isPrivate: boolean;
};

export interface Room {
  id: string;
  players: Player[];
  roomIsAvaible: boolean;
  roundIsOver: boolean;
  roundResults?: { verdict: string; opponentPick: string };
  roomIsFull: boolean;
  opponentReady: boolean;
  isGameOver: boolean;
}

export interface SanitizeRoom {
  id: string;
  players: SanitizePlayer[];
  roomIsAvaible: boolean;
  roundIsOver: boolean;
  roundResults?: { verdict: string; opponentPick: string };
  roomIsFull: boolean;
  opponentReady: boolean;
}
