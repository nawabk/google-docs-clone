import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
type Props = {
  heading: React.ReactNode;
  children: React.ReactNode;
  submitButton: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submitHandler: () => void;
};
const Modal = ({
  heading,
  submitButton,
  open,
  setOpen,
  children,
  submitHandler,
}: Props) => {
  return (
    open && (
      <>
        <Backdrop onClick={() => setOpen(false)} />
        {ReactDOM.createPortal(
          <div className="w-1/4 grid grid-rows-3-auto grid-cols-2 z-30 absolute left-1/2 -translate-x-1/2 top-1/3 bg-white rounded-xl p-4 align-middle items-center gap-4">
            <div className="row-span-1 col-span-1 w-max">
              <h2 className="text-2xl">{heading}</h2>
            </div>
            <div className="row-span-1 col-start-2 col-span-1 flex justify-end">
              <FontAwesomeIcon
                icon={faTimes}
                className="text-2xl text-gray-400 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="row-start-2 row-span-1 col-span-full">
              {children}
            </div>
            <div className="row-start-3 row-span-1 col-span-full flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-500 rounded-2xl px-4 py-2 text-white text-sm"
                onClick={submitHandler}
              >
                {submitButton}
              </button>
            </div>
          </div>,
          document.querySelector("body")!
        )}
        ;
      </>
    )
  );
};

export default Modal;
