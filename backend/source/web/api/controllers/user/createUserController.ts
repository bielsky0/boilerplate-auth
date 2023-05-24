import { Dependencies } from "@application/di";

import { CookieOptions } from "express";

export type Response = {
  headers: {
    [key: string]: string;
  };
  body: any;
  statusCode: number;
  cookies?: {
    name: string;
    val: string;
    options: CookieOptions;
  }[];
};

export const makeCreateUserController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };
    const newUser = await dependencies.users.createUser(httpRequest.body);

    return {
      headers,
      statusCode: 200,
      body: {
        user: newUser,
      },
    };
  };
};
