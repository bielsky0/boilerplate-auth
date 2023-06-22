import { Player } from "../player";
import { RoomInput } from "./types";

export class Room {
  private _id: string;
  private _players: Player[];
  private _vacant: boolean;
  private _private: boolean;

  constructor({ id, players, vacant, isPrivate }: RoomInput) {
    this._id = id;
    this._players = players;
    this._private = isPrivate;
    this._vacant = vacant;
  }

  public get id(): string {
    return this._id;
  }

  public get players(): Player[] {
    return this._players;
  }

  public get vacant(): boolean {
    return this._vacant;
  }

  public get isPrivate(): boolean {
    return this._private;
  }
}
