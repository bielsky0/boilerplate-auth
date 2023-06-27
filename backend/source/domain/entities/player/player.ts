import { PlayerInput } from "./types";

export class Player {
  private _id: string;
  private _option: string | null;
  private _optionLock: boolean;
  private _score: number;

  constructor({ option, optionLock, score, id }: PlayerInput) {
    this._option = option;
    this._optionLock = optionLock;
    this._score = score;
    this._id = id;
  }

  public get option(): string | null {
    return this._option;
  }

  public get optionLock(): boolean {
    return this._optionLock;
  }
  public get score(): number {
    return this._score;
  }
  public get id(): string {
    return this._id;
  }
}
