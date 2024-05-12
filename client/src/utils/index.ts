import { FormValidationResult, ValidationRule } from "../types/auth";

export function validateForm<T>({
  validationRule,
  formData,
}: {
  validationRule: ValidationRule;
  formData: FormData;
}): FormValidationResult<T> {
  let isFormValid = true;
  let errorMessage: Record<string, string> = {};
  let formValue: Record<string, string | undefined> = {};
  for (const [input, rule] of Object.entries(validationRule)) {
    const value = formData.get(input)?.toString();
    const { type, required } = rule;

    if (required && !value) {
      errorMessage[input] = `Field is required!`;
      isFormValid = false;
    }
    if (value) {
      switch (type) {
        case "email": {
          const isValid = validateEmail(value);
          if (!isValid) {
            errorMessage[input] = `Invalid email!`;
            isFormValid = false;
          }
          break;
        }
      }
    }
    formValue[input] = value;
  }
  return {
    isFormValid,
    errorMessage,
    formValue: formValue as T,
  };
}

function validateEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
