import {
  IRouter,
  Request,
  Response as ExpressResponse,
  NextFunction,
} from "express";

import { Controller } from "@web/api/makeExpressCallback";
import { Dependencies } from "@web/crosscutting/container";
import { makeLoginUserController } from "@web/api/controllers/auth/loginUserController";
import { makeRefreshController } from "@web/api/controllers/auth/refreshTokenController";
import { makeLogoutController } from "../controllers/auth/logoutController";

export type MakeCallback = (
  controller: Controller
) => (req: Request, res: ExpressResponse, next: NextFunction) => void;

export const authRouter = ({
  dependencies,
  router,
  makeCallback,
}: {
  dependencies: Dependencies;
  router: IRouter;
  makeCallback: MakeCallback;
}) => {
  const loginUserController = makeLoginUserController(dependencies);
  router.post("/login", makeCallback(loginUserController));

  const refreshTokenController = makeRefreshController(dependencies);
  router.get("/refreshToken", makeCallback(refreshTokenController));

  const logoutController = makeLogoutController(dependencies);
  router.get("/logout", makeCallback(logoutController));

  return router;
};
