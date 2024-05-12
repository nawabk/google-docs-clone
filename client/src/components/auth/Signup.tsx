import { useState } from "react";
// import AuthForm from "./AuthForm";
import { ENDPOINT } from "../../constants";
import useFetch from "../../hooks/useFetch";
import { SignUpResponse, ValidationRule } from "../../types/auth";
import { validateForm } from "../../utils";
import AuthForm from "./AuthForm";

const Signup = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] =
    useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const { status, apiCall, error } = useFetch();
  console.log(status, error);
  const validationRule: ValidationRule = {
    username: {
      type: "text",
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

  const passwordConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordConfirmTouched(true);
    setIsPasswordConfirmCorrect(e.target.value === password);
    setPasswordConfirm(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isPasswordConfirmTouched)
      setIsPasswordConfirmCorrect(value === passwordConfirm);
    setPassword(value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { isFormValid, errorMessage, formValue } = validateForm<
      Record<keyof typeof validationRule, string>
    >({
      validationRule,
      formData,
    });
    if (!isFormValid) {
      setErrorMessage(errorMessage);
      return;
    }
    setErrorMessage({});
    apiCall<SignUpResponse>({
      url: ENDPOINT.BASE + ENDPOINT.AUTH.SING_UP,
      returnResponse: true,
      method: "POST",
      body: {
        ...formValue,
      },
    });
  };
  return (
    <AuthForm heading="Sign up">
      <AuthForm.Form onSubmit={formSubmitHandler}>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="username">Username</AuthForm.Label>
          <AuthForm.Input
            id="username"
            name="username"
            type="text"
            placeholder="Your username"
            errorMessage={errorMessage["username"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="email">Email</AuthForm.Label>
          <AuthForm.Input
            id="email"
            name="email"
            placeholder="john@email.com"
            errorMessage={errorMessage["email"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="password">Password</AuthForm.Label>
          <AuthForm.Input
            id="password"
            name="password"
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={passwordChangeHandler}
            errorMessage={errorMessage["password"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="passwordConfirm">
            Password Confirm
          </AuthForm.Label>
          <AuthForm.Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Please confirm your password"
            disabled={password.length === 0}
            onChange={passwordConfirmHandler}
            value={passwordConfirm}
            className={
              isPasswordConfirmTouched
                ? isPasswordConfirmCorrect
                  ? "border-green-600 border-2 focus:border-green-600"
                  : "border-red-600 border-2 focus:border-red-600"
                : ""
            }
            errorMessage={errorMessage["passwordConfirm"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.Button>Sign up</AuthForm.Button>
      </AuthForm.Form>
    </AuthForm>
  );
};

export default Signup;
