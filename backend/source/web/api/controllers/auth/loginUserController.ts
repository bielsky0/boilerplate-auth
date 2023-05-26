import { Dependencies } from "@application/di";
import { Response } from "@web/api/controllers/user/createUserController";

export const makeLoginUserController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };

    const { user, accessToken, refreshToken } =
      await dependencies.auth.loginUser(httpRequest);

    return {
      headers,
      statusCode: 200,
      body: {
        user,
      },
      cookies: {
        toSet: [
          {
            name: "refresh_token",
            val: refreshToken,
            options: {
              httpOnly: true,
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            },
          },
          {
            name: "access_token",
            val: accessToken,
            options: {
              httpOnly: true,
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            },
          },
        ],
      },
    };
  };
};
