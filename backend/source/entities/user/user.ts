import { Role, User } from "./types";

export default function buildMakeUser() {
  return function makeUser({
    id,
    email,
    password,
    role = Role.user,
    name,
  }: User) {
    if (!id) throw new Error("User must have a id");

    if (!email) throw new Error("User must have an email");

    if (!password) throw new Error("User must have password");

    return Object.freeze({
      getId: () => id,
      getEmail: () => email,
      getRole: () => role,
      getName: () => name,
    });
  };
}
