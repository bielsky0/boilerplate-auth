import { Dependencies } from "@application/di";
import { Response } from "@web/api/controllers/user/createUserController";

export const makeLoginUserController = (dependencies: Dependencies) => {
  return async (httpRequest: any): Promise<Response> => {
    const headers = {
      "Content-Type": "application/json",
    };

    const { user, accessToken, refreshToken } =
      await dependencies.auth.loginUser(httpRequest);

    const data = await dependencies.auth.refreshToken(httpRequest);

    return {
      headers,
      statusCode: 200,
      body: {
        user,
      },
      cookies: [
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
    };
  };
};
