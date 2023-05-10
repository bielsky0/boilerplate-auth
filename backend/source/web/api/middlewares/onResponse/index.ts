import { Application } from "express";
import { makeHandleNotFound } from "./handleNotFound";
import { makeHandleException } from "./handleExceptions";
import { Dependencies } from "@web/crosscutting/container";

export function onResponse({
  app,
}: {
  app: Application;
  dependencies: Dependencies;
}) {
  app.use("*", makeHandleNotFound());
  app.use(makeHandleException());
}
