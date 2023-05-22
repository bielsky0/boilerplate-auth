import express, { Application } from "express";
import cookieParser from "cookie-parser";

export function onRequest({ app }: { app: Application }) {
  app.use(express.json());
  app.use(cookieParser());
  app.use("/health", (req, res) => res.status(200).send("OK"));
}
