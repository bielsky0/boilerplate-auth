import { Dependencies } from "@application/di";
import { Response } from "@web/api/controllers/user/createUserController";

export const makeRefreshController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };

    const { accessToken, refreshToken } = await dependencies.auth.refreshToken(
      httpRequest
    );

    return {
      headers,
      statusCode: 200,
      body: {
        accessToken: accessToken,
      },
      cookies: {
        toSet: [
          {
            name: "refresh_token",
            val: refreshToken,
            options: {
              httpOnly: false,
            },
          },
          {
            name: "access_token",
            val: accessToken,
            options: {
              httpOnly: false,
            },
          },
        ],
      },
    };
  };
};
