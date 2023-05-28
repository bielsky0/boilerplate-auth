import { JwtPayload, Jwt, VerifyCallback } from "./jwt";

export type SignOptions = {
  expiresIn?: string | number | undefined;
};

export interface AuthService {
  hashPassword(password: string): Promise<string>;
  comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  signJwt(
    payload: string | Buffer | object,
    secret: string,
    options?: SignOptions
  ): string;
  verifyJwt(token: string, secret: string): Promise<string | Jwt | JwtPayload>;
}
