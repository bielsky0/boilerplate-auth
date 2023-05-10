import { makeContainer } from "../crosscutting/container";

import { makeApp } from "./app";

const dependencies = makeContainer();

const PORT = Number(process.env.PORT);

makeApp(dependencies).listen(PORT, function applicationStarted() {
  console.log("App started on port ", PORT);
});
