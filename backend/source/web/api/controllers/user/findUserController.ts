import { Dependencies } from "@application/di";
import { Response } from "./createUserController";
import { UnauthorizedException } from "@application/exceptions";

export const makeFindUserController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (!httpRequest.userEmail) {
      throw new UnauthorizedException("xDDD");
    }

    const newUser = await dependencies.users.findUser({
      email: httpRequest.userEmail,
    });

    return {
      headers,
      statusCode: 200,
      body: {
        user: newUser,
      },
    };
  };
};
