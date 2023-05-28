import { InvalidTokenException } from "@application/exceptions";
import { AuthService, CryptoService, JwtService } from "@domain/interfaces";
import jwt from "jsonwebtoken";

export type MakeAuthServiceDependencies = {
  cryptoService: CryptoService;
  jwtService: JwtService;
};
jwt.verify;
//TODO add error handling
//TODO add generic typing for payload
export const makeAuthService = ({
  cryptoService,
  jwtService,
}: MakeAuthServiceDependencies): AuthService => {
  return {
    hashPassword: async (password) => {
      const salt = await cryptoService.genSalt(10);
      const hashedPassword = cryptoService.hash(password, salt);
      return hashedPassword;
    },
    comparePassword: async (plainPassword: string, hashedPassword: string) => {
      return await cryptoService.compare(plainPassword, hashedPassword);
    },
    verifyJwt: (token, secret) => {
      return new Promise((resolve, reject) => {
        jwtService.verify(token, secret, (error, decoded) => {
          if (error) {
            return reject(new InvalidTokenException("xxxxx"));
          }

          if (!decoded) {
            return reject(new InvalidTokenException("xxxxx"));
          }

          return resolve(decoded);
        });
      });
    },
    signJwt: (token, secret, options) => {
      return jwtService.sign(token, secret, options);
    },
  };
};
