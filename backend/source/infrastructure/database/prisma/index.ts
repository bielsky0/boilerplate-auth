import { PrismaClient } from "@prisma/client";

export const makePrismaCLient = () => {
  //can't find proper client options type
  return new PrismaClient();
};
