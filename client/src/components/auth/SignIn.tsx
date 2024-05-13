import { Dispatch, SetStateAction } from "react";
import { CurrentAuthForm } from "../../types/auth";
import AuthForm from "./AuthForm";
import SwitchForm from "./SwitchForm";

type Props = {
  setCurrentAuthForm: Dispatch<SetStateAction<CurrentAuthForm>>;
};
const SignIn = ({ setCurrentAuthForm }: Props) => {
  const formSubmitHandler = (e: React.FormEvent) => {};
  return (
    <AuthForm heading="Sign in">
      <AuthForm.Form onSubmit={formSubmitHandler}>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="email">Email</AuthForm.Label>
          <AuthForm.Input
            id="email"
            name="email"
            placeholder="john@email.com"
            // errorMessage={errorMessage["email"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.InputGroup>
          <AuthForm.Label htmlFor="password">Password</AuthForm.Label>
          <AuthForm.Input
            id="password"
            name="password"
            type="password"
            placeholder="Please enter your password"
            // errorMessage={errorMessage["password"]}
          />
        </AuthForm.InputGroup>
        <AuthForm.Button>Sign in</AuthForm.Button>
        <SwitchForm
          currentAuthForm="signin"
          setCurrentAuthForm={setCurrentAuthForm}
        />
      </AuthForm.Form>
    </AuthForm>
  );
};

export default SignIn;
