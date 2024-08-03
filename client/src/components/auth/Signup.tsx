import { useState } from "react";
import { ENDPOINT, VERIFY_SIGNUP_MESSAGE } from "../../constants";
import { signupValidationRule } from "../../constants/auth";
import { useAuthContext } from "../../context/auth-context";
import useFetch from "../../hooks/useFetch";
import {
  SignUpFormValue,
  SignUpRequest,
  SignUpResponse,
} from "../../types/auth";
import { validateForm } from "../../utils";
import AuthForm from "./AuthForm";
import SwitchForm from "./SwitchForm";
import Timer from "./Timer";

const Signup = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] =
    useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const { state, dispatch } = useAuthContext();
  const { status, apiCall, error } = useFetch();

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

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const { isFormValid, errorMessage, formValue } =
      validateForm<SignUpFormValue>({
        validationRule: signupValidationRule,
        formData,
      });
    let passwordConfirmError = false;
    if (isPasswordConfirmTouched && !isPasswordConfirmCorrect) {
      passwordConfirmError = true;
      setErrorMessage((prevState) => ({
        ...prevState,
        passwordConfirm: "Password Confirm does not match with password",
      }));
    }
    if (!isFormValid) {
      setErrorMessage(errorMessage);
    }
    if (passwordConfirmError || !isFormValid) return;
    setErrorMessage({});
    const response = await apiCall<SignUpResponse, SignUpRequest>({
      url: ENDPOINT.BASE + ENDPOINT.AUTH.SING_UP,
      method: "POST",
      body: {
        ...formValue,
      },
    });
    if (response) {
      const { data } = response;
      dispatch({
        type: "SET_USER",
        payload: data,
      });
    }
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
        <AuthForm.Button loading={status === "loading"}>
          Sign up
        </AuthForm.Button>
        <SwitchForm />
        <span className="text-red-600 text-sm mt-1 flex justify-center font-bold">
          {error}
        </span>
        {status === "success" && (
          <>
            <span className="text-green-400 text-sm mt-1 flex justify-center font-semibold">
              {VERIFY_SIGNUP_MESSAGE}
            </span>
            <Timer userId={state._id} />
          </>
        )}
      </AuthForm.Form>
    </AuthForm>
  );
};

export default Signup;
