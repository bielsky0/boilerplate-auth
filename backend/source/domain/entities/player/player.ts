import { PlayerInput } from "./types";

export class Player {
  private _option: string | null;
  private _optionLock: boolean;
  private _score: number;

  constructor({ option, optionLock, score }: PlayerInput) {
    this._option = option;
    this._optionLock = optionLock;
    this._score = score;
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
}
