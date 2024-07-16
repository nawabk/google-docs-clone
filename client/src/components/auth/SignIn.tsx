import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import { signinValidationRule } from "../../constants/auth";
import { useAuthContext } from "../../context/auth-context";
import useFetch from "../../hooks/useFetch";
import {
  SignInFormValue,
  SignInRequest,
  SignInResponse,
} from "../../types/auth";
import { validateForm } from "../../utils";
import AuthForm from "./AuthForm";
import SwitchForm from "./SwitchForm";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const { status, error, apiCall } = useFetch();
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { isFormValid, errorMessage, formValue } =
      validateForm<SignInFormValue>({
        validationRule: signinValidationRule,
        formData,
      });
    if (!isFormValid) {
      setErrorMessage(errorMessage);
      return;
    }
    setErrorMessage({});
    const data = await apiCall<SignInResponse, SignInRequest>({
      url: ENDPOINT.BASE + ENDPOINT.AUTH.SIGN_IN,
      method: "POST",
      body: {
        ...formValue,
      },
    });
    if (data) {
      dispatch({
        type: "SET_USER",
        payload: data,
      });
      dispatch({
        type: "SET_IS_AUTHENTICATED",
        payload: true,
      });
      dispatch({
        type: "SET_IS_USER_VALIDATED",
        payload: true,
      });
      navigate("/");
    }
  };
  return (
    <AuthForm heading="Sign in">
      <AuthForm.Form onSubmit={formSubmitHandler}>
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
            errorMessage={errorMessage["password"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.Button loading={status === "loading"}>
          Sign in
        </AuthForm.Button>
        <SwitchForm />
        <span className="text-red-600 text-sm mt-1 flex justify-center font-bold">
          {error}
        </span>
      </AuthForm.Form>
    </AuthForm>
  );
};

export default SignIn;
