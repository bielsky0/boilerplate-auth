import * as Yup from "yup";
import { ValidationException } from "@application/exceptions/";
import { CreateUserCommand } from "./addUser";
import { Role } from "@domain/entities/user/types";

export const validate = async (command: CreateUserCommand) => {
  try {
    const schema: Yup.ObjectSchema<CreateUserCommand> = Yup.object().shape({
      name: Yup.string().required().nullable(),
      email: Yup.string().required(),
      role: Yup.mixed<Role>().oneOf(Object.values(Role)).required(),
      password: Yup.string().required(),
    });
    await schema.validate(command, { abortEarly: false, strict: true });
  } catch (error) {
    throw new ValidationException(error as Yup.ValidationError);
  }
};
