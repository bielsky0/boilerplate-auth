import express, { Router } from "express";
import { Dependencies } from "../crosscutting/container";
import { userRouter } from "./routers/userRouter";
import { makeExpressCallback } from "./makeExpressCallback";

import * as middlewares from "./middlewares";

export function makeApp(dependencies: Dependencies) {
  const apiRoot = "/api/v1";
  const app = express();

  middlewares.onRequest({ app });

  const router = userRouter({
    dependencies: dependencies,
    router: Router(),
    makeCallback: makeExpressCallback,
  });

  app.use(router);
  middlewares.onResponse({ app, dependencies });

  return app;
}
