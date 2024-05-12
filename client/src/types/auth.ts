export type ValidationRule = Record<
  string,
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
