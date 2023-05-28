import {
  IRouter,
  Request,
  Response as ExpressResponse,
  NextFunction,
} from "express";

import { Controller } from "@web/api/makeExpressCallback";
import { Dependencies } from "@web/crosscutting/container";
import { makeCreateUserController } from "@web/api/controllers/user/createUserController";
import { makeAuthMiddleware } from "@web/api/middlewares/onRequest/auth";
import { makeFindUserController } from "@web/api/controllers";

export type MakeCallback = (
  controller: Controller
) => (req: Request, res: ExpressResponse, next: NextFunction) => void;

export const userRouter = ({
  dependencies,
  router,
  makeCallback,
}: {
  dependencies: Dependencies;
  router: IRouter;
  makeCallback: MakeCallback;
}) => {
  const createUserController = makeCreateUserController(dependencies);
  router.post(`/user`, makeCallback(createUserController));

  const authMiddleware = makeAuthMiddleware({
    authService: dependencies.authService,
  });
  const findUserController = makeFindUserController(dependencies);
  router.get(`/me`, authMiddleware, makeCallback(findUserController));

  return router;
};
