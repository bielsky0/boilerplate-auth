import express from "express";
import { createClient } from "redis";

import { bootstrap } from "./config";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", function () {
  console.log("Redis plugged in.");
});

client.on("error", (err) => console.log("Redis Client Error", err));

bootstrap();
