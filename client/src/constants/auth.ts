import { ValidationRule } from "../types/auth";

export const signupValidationRule: ValidationRule<{
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}> = {
  username: {
    type: "email",
    required: true,
  },
  email: {
    type: "email",
    required: true,
  },
  password: {
    type: "password",
    required: true,
  },
  passwordConfirm: {
    type: "password",
    required: true,
  },
};
