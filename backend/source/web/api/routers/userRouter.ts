import {
  IRouter,
  Request,
  Response as ExpressResponse,
  NextFunction,
} from "express";
import { Controller } from "../makeExpressCallback";
import {
  Response,
  makeCreateUserController,
} from "../controllers/userController";
import { Dependencies } from "@web/crosscutting/container";

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

  return router;
};
