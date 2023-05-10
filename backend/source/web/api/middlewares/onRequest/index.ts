import express, { Application } from "express";

export function onRequest({ app }: { app: Application }) {
  app.use(express.json());
  app.use("/health", (req, res) => res.status(200).send("OK"));
}
