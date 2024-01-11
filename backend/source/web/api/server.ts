import { makeIo } from "@web/socket/io";
import { makeContainer } from "../crosscutting/container";

import { makeApp } from "./app";
import { createServer } from "http";

async function boot() {
  try {
    const dependencies = await makeContainer();

    const PORT = Number(process.env.PORT);

    const app = makeApp(dependencies);

    const server = createServer(app);

    makeIo(dependencies, server);

    server.listen(PORT, function applicationStarted() {
      console.log("App started on port ", PORT);
    });
  } catch (err) {

  }
}



boot();