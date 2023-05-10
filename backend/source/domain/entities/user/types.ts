export interface UserInput {
  id?: string;
  email: string;
  password: string;
  name: string | null;
  role: Role;
}

export const Role: { [x: string]: "user" | "admin" } = {
  user: "user",
  admin: "admin",
};

export type Role = (typeof Role)[keyof typeof Role];
