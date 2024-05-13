import { signupValidationRule } from "../constants/auth";

export type ValidationRule<T = {}> = Record<
  keyof T,
  {
    type: "email" | "password" | "text" | "number";
    required: boolean;
  }
>;

export type FormValidationResult<T> = {
  isFormValid: boolean;
  errorMessage: Record<string, string>;
  formValue: T;
};

export type SignUpResponse = {
  username: string;
  isEmail: string;
  isEmailVerified: boolean;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SignUpFormValue = Record<keyof typeof signupValidationRule, string>;
