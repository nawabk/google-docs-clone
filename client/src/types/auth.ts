import { signinValidationRule, signupValidationRule } from "../constants/auth";

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
  _id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SignUpFormValue = Record<keyof typeof signupValidationRule, string>;

export type SignInFormValue = Record<keyof typeof signinValidationRule, string>;

export type CurrentAuthForm = "signup" | "signin";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  _id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
};
