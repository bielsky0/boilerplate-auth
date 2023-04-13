import { initExpress } from "./initExpress";

export const bootstrap = async () => {
  try {
    initExpress();
  } catch (error) {}
};
