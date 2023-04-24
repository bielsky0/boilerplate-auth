import { server } from "./server";

(async () => {
  server.listen(process.env.PORT, () => {
    console.log(`Web application is listening on port ${process.env.PORT}`);
  });
})();
