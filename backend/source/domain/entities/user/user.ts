import { Role, UserInput } from "./types";

export class User {
  public id?: string;
  public name: string | null;
  public email: string;
  public password: string;
  public role: Role;
  public refreshTokens: string[];

  constructor({
    id,
    name,
    email,
    password,
    role,
    refreshTokens = [],
  }: UserInput) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.id = id;
    this.refreshTokens = refreshTokens;
  }
}
