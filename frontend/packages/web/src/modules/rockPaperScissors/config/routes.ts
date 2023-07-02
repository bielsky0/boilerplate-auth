import { nestedPath } from "../../../utils";

export const RoutesConfig = {
  rockPaperSicssors: nestedPath("rock-paper-scissors", {
    home: "",
    room: "room/:id",
  }),
};
