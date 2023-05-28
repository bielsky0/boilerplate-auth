export type JwtSignOptions = {
  expiresIn?: string | number | undefined;
};

export interface Jwt {
  header: JwtHeader;
  payload: JwtPayload | string;
  signature: string;
}

export interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export interface JwtHeader {
  alg: string | Algorithm;
  typ?: string | undefined;
  cty?: string | undefined;
  crit?: Array<string | Exclude<keyof JwtHeader, "crit">> | undefined;
  kid?: string | undefined;
  jku?: string | undefined;
  x5u?: string | string[] | undefined;
  "x5t#S256"?: string | undefined;
  x5t?: string | undefined;
  x5c?: string | string[] | undefined;
}

export type VerifyCallback = (
  error: Error | null,
  decoded: string | Buffer | object | undefined
) => void;

export interface JwtService {
  verify(
    token: string,
    secretOrPrivateKey: string,
    callback: VerifyCallback
  ): void;
  sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string,
    options?: JwtSignOptions
  ): string;
}
