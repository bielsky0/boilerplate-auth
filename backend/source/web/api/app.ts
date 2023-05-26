import express, { Router } from "express";

import { Dependencies } from "@web/crosscutting/container";
import { makeExpressCallback } from "@web/api/makeExpressCallback";

import * as middlewares from "./middlewares";
import { authRouter, userRouter } from "./routers";

export function makeApp(dependencies: Dependencies) {
  const apiRoot = "/api/v1";
  const app = express();
  const baseRouter = Router();

  middlewares.onRequest({ app });

  const userR = userRouter({
    dependencies: dependencies,
    router: baseRouter,
    makeCallback: makeExpressCallback,
  });
  app.use(userR);

  const authR = authRouter({
    dependencies: dependencies,
    router: baseRouter,
    makeCallback: makeExpressCallback,
  });
  app.use(authR);

  middlewares.onResponse({ app, dependencies });
  return app;
}
