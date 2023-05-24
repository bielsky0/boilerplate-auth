import * as Yup from "yup";
import { ValidationException } from "@application/exceptions/";
import { LoginUserCommand } from "./loginUser";

export const validate = async ({
  body: { email, password },
}: LoginUserCommand) => {
  try {
    const schema: Yup.ObjectSchema<{ email: string; password: string }> =
      Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });
    await schema.validate(
      { email, password },
      { abortEarly: false, strict: true }
    );
  } catch (error) {
    throw new ValidationException(error as Yup.ValidationError);
  }
};
