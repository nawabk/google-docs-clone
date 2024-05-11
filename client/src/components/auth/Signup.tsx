import { useState } from "react";
// import AuthForm from "./AuthForm";
import AuthForm from "./AuthForm";

type FormValidation = {};
const Signup = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] =
    useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);
  const [formValidation, setFormValidation] = useState({
    username: {},
  });

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
  return (
    <AuthForm heading="Sign up">
      <AuthForm.Form>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="username">Username</AuthForm.Label>
          <AuthForm.Input
            id="username"
            type="text"
            placeholder="Your username"
            required
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="email">Email</AuthForm.Label>
          <AuthForm.Input
            id="email"
            type="email"
            placeholder="john@email.com"
            required
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="password">Password</AuthForm.Label>
          <AuthForm.Input
            id="password"
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={passwordChangeHandler}
            required
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="passwordConfirm">
            Password Confirm
          </AuthForm.Label>
          <AuthForm.Input
            id="passwordConfirm"
            type="password"
            placeholder="Please confirm your password"
            disabled={password.length === 0}
            required
            onChange={passwordConfirmHandler}
            value={passwordConfirm}
            className={
              isPasswordConfirmTouched
                ? isPasswordConfirmCorrect
                  ? "border-green-600 border-2 focus:border-green-600"
                  : "border-red-600 border-2 focus:border-red-600"
                : ""
            }
          />
        </AuthForm.InputGroup>
        <AuthForm.Button>Sign up</AuthForm.Button>
      </AuthForm.Form>
    </AuthForm>
  );
};

export default Signup;
