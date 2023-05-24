import {
  IRouter,
  Request,
  Response as ExpressResponse,
  NextFunction,
} from "express";

import { Controller } from "@web/api/makeExpressCallback";
import { Dependencies } from "@web/crosscutting/container";
import { makeLoginUserController } from "@web/api/controllers/auth/loginUserController";
import { makeCreateUserController } from "@web/api/controllers/user/createUserController";

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
  const loginUserController = makeLoginUserController(dependencies);

  router.post(`/user`, makeCallback(createUserController));
  router.post("/login", makeCallback(loginUserController));

  return router;
};
