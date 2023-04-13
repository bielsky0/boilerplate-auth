import express from "express";

export const initExpress = () => {
  const app = express();

  app.listen(process.env.PORT, function () {
    console.log(`Web application is listening on port ${process.env.PORT}`);
  });
};
