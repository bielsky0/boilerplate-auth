import { nestedPath } from "../../../utils";

export const RoutesConfig = {
  rockPaperSicssors: nestedPath("rock-paper-scissors", {
    home: "",
    roomId: "room/:id",
    room: "room",
    gameOver: 'gameover'
  }),
};
