import { AuthService, CryptoService, JwtService } from "@domain/interfaces";

export type MakeAuthServiceDependencies = {
  cryptoService: CryptoService;
  jwtService: JwtService;
};

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
      return jwtService.verify(token, secret);
    },
    signJwt: (token, secret, options) => {
      return jwtService.sign(token, secret, options);
    },
  };
};
