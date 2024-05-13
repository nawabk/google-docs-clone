import { Dispatch, SetStateAction } from "react";
import { CurrentAuthForm } from "../../types/auth";

type Props = {
  currentAuthForm: CurrentAuthForm;
  setCurrentAuthForm: Dispatch<SetStateAction<CurrentAuthForm>>;
};
const SwitchForm = ({ currentAuthForm, setCurrentAuthForm }: Props) => {
  let text;
  if (currentAuthForm === "signin") {
    text = "Don't have account?";
  } else {
    text = "Alreay have an account?";
  }
  return (
    <p className="text-sm">
      {text}
      <span className="text-blue-500 ml-1 mt-1">
        <a
          href="#"
          onClick={() =>
            setCurrentAuthForm((prev) => {
              if (prev === "signin") return "signup";
              return "signin";
            })
          }
        >
          {currentAuthForm === "signin" ? "Sign up" : "Sign in"}
        </a>
      </span>
    </p>
  );
};

export default SwitchForm;
