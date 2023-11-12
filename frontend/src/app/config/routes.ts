import { RoutesConfig as RockPaperScissorsRoutes } from "../../modules/rockPaperScissors/config/routes";
import { RoutesConfig as HomeRoutes } from "../../modules/home/config/routes";

export const LANG_PREFIX = `/:lang?/*`;

export const RoutesConfig = {
  ...HomeRoutes,
  ...RockPaperScissorsRoutes,
};
