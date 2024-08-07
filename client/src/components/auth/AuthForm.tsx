import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";
const AuthForm = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
    <div className="col-span-full justify-self-center mt-20 w-1/3 shadow-lg rounded-lg px-10 py-6">
      <h2 className="text-3xl text-center font-semi-bold">{heading}</h2>
      {children}
    </div>
  );
};

const Form = ({ children, ...rest }: ComponentProps<"form">) => {
  return (
    <form className="mt-10" {...rest}>
      {children}
    </form>
  );
};

const InputGroup = ({ children, ...rest }: ComponentProps<"div">) => {
  return (
    <div className="flex flex-col gap-2 mb-6" {...rest}>
      {children}
    </div>
  );
};

const Label = ({ children, ...rest }: ComponentProps<"label">) => {
  return (
    <label className="ml-1" {...rest}>
      {children}
    </label>
  );
};

const Input = ({
  className = "",
  errorMessage = "",
  ...rest
}: ComponentProps<"input"> & { className?: string; errorMessage?: string }) => {
  const classNames = [
    "border border-gray-400 px-2 py-1 h-10 rounded-lg focus:border-blue-500 focus:border-2 focus:outline-none w-full",
  ];
  if (className) classNames.push(className);
  return (
    <div className="flex flex-col">
      <input className={classNames.join(" ")} {...rest} />
      {errorMessage && (
        <span className="text-red-600 text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

type ButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
};
const Button = ({ children, loading = false, ...rest }: ButtonProps) => {
  return (
    <div className="mt-8">
      <button
        type="submit"
        className="p-2 text-center w-full bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:bg-blue-400"
        disabled={loading}
        {...rest}
      >
        {children}
        {loading && (
          <FontAwesomeIcon icon={faCircleNotch} spin className="ml-2" />
        )}
      </button>
    </div>
  );
};

AuthForm.Form = Form;
AuthForm.InputGroup = InputGroup;
AuthForm.Label = Label;
AuthForm.Input = Input;
AuthForm.Button = Button;

export default AuthForm;
