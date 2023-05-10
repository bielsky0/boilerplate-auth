import { AuthService } from "@domain/interfaces";

export interface CryptoService {
  genSalt(rounds: number): Promise<string>;
  hash(pass: string, salt: string): Promise<string>;
  compare(plainPass: string, hashedPass: string): Promise<boolean>;
}

export type MakeAuthServiceDependencies = {
  cryptoService: CryptoService;
};

export const makeAuthService = ({
  cryptoService,
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
  };
};
