import express from "express";
import { createClient } from "redis";

const app = express();

const client = createClient({
  url: process.env.REDIS_URL,
});

console.log(client);

client.on("connect", function () {
  console.log("Redis plugged in.");
});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  client.connect();
  //   client.ping();
})();
app.listen(process.env.PORT, function () {
  console.log(`Web application is listening on port ${process.env.PORT}`);
});
