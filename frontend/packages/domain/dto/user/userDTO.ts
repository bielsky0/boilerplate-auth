export interface IUserParams {
  id: string;
  password: string;
  email: string;
}

export interface IUserDTO {
  readonly id: string;
  readonly password: string;
  readonly email: string;
}

export class UserDTO implements IUserDTO {
  readonly id: string;
  readonly password: string;
  readonly email: string;

  constructor(userParams: IUserParams) {
    this.id = userParams.id;
    this.password = userParams.password;
    this.email = userParams.email;
  }
}
