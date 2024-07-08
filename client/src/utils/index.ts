import { FormValidationResult, ValidationRule } from "../types/auth";

export function validateForm<FormValue>({
  validationRule,
  formData,
}: {
  validationRule: ValidationRule;
  formData: FormData;
}): FormValidationResult<FormValue> {
  let isFormValid = true;
  const errorMessage: Record<string, string> = {};
  const formValue: FormValue = {} as FormValue;
  for (const entries of Object.entries(validationRule)) {
    const input = entries[0];
    const rule = entries[1] as ValidationRule[keyof typeof validationRule];
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
    formValue[input as keyof FormValue] = value as FormValue[keyof FormValue];
  }
  return {
    isFormValid,
    errorMessage,
    formValue: formValue,
  };
}

function validateEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function formatTimer(time: string | number) {
  if (typeof time === "number") {
    time = time.toString();
  }

  return time.padStart(2, "0");
}
