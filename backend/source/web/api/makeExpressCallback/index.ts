import { NextFunction, Request, Response } from "express";
import { Response as ControllerResponse } from "../controllers/userController";

export type Controller = (httpRequest: any) => Promise<ControllerResponse>;

export const makeExpressCallback = (controller: Controller) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => next(e));
  };
};
