import { useLocation, useNavigate } from "react-router-dom";

const SwitchForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSignInForm = pathname === "/signin";

  const text = isSignInForm ? "Don't have account?" : "Alreay have an account?";

  return (
    <p className="text-sm">
      {text}
      <span className="text-blue-500 ml-1 mt-1">
        <a
          href="#"
          onClick={() => {
            if (isSignInForm) {
              navigate("/signup");
            } else {
              navigate("/signin");
            }
          }}
        >
          {isSignInForm ? "Sign up" : "Sign in"}
        </a>
      </span>
    </p>
  );
};

export default SwitchForm;
