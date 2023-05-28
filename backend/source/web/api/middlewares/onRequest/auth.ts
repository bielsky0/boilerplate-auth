import { NextFunction, Request, Response } from "express";

import {
  InvalidTokenException,
  UnauthorizedException,
} from "@application/exceptions";
import { AuthService } from "@domain/interfaces";

export type MakeAuthMiddlewareDependencies = {
  authService: AuthService;
};

export const makeAuthMiddleware = ({
  authService,
}: MakeAuthMiddlewareDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { cookies } = req;

    if (!cookies?.access_token)
      throw new UnauthorizedException(`Access token is missing`);

    try {
      const { email } = (await authService.verifyJwt(
        cookies.access_token,
        `${process.env.ACCES_TOKEN_SECRET}`
      )) as { email: string };
      req.userEmail = email;
    } catch (err) {}

    next();
  };
};
