import { RoutesConfig as RockPaperScissorsRoutes } from "../../modules/rockPaperScissors/config/routes";

export const LANG_PREFIX = `/:lang?/*`;

export const RoutesConfig = {
  home: "",
  ...RockPaperScissorsRoutes,
};
