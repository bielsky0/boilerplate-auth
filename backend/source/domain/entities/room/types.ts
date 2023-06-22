import { Player } from "../player";

export type RoomInput = {
  id: string;
  players: Player[];
  vacant: boolean;
  isPrivate: boolean;
};
