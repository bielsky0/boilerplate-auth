export interface CryptoService {
  genSalt(rounds: number): Promise<string>;
  hash(pass: string, salt: string): Promise<string>;
  compare(plainPass: string, hashedPass: string): Promise<boolean>;
}
