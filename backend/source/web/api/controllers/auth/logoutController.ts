import { Dependencies } from "@application/di";
import { Response } from "@web/api/controllers/user/createUserController";

export const makeLogoutController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };

    await dependencies.auth.logout(httpRequest);

    return {
      headers,
      statusCode: 204,
      body: {},
      cookies: {
        toClear: [
          { name: "refresh_token", options: { httpOnly: true, secure: true } },
        ],
      },
    };
  };
};
