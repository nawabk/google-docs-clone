import { signinValidationRule, signupValidationRule } from "../constants/auth";
import { GenericField } from "./common";

export type ValidationRule<T = void> = Record<
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

export type SignInResponse = GenericField & {
  _id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
};

export type SearchUserResponse = {
  _id: string;
  email: string;
  username: string;
};
