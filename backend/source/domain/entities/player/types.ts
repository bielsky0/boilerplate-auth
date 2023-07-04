export type PlayerInput = {
  option: string | null;
  isOptionPicked: boolean;
  score: number;
  id: string;
};

export interface Player {
  option: string | null;
  isOptionPicked: boolean;
  score: number;
  id: string;
}

export interface SanitizePlayer {
  isOptionPicked: boolean;
  score: number;
  id: string;
}
