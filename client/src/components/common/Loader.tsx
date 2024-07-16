import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

type Props = {
  backdrop?: boolean;
};
const Loader = ({ backdrop = false }: Props) => {
  return createPortal(
    <>
      <div className="flex flex-col items-center gap-3 absolute left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 z-30">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
        <p className="text-xl flex justify-center items-center">Loading...</p>
      </div>
      {backdrop && <Backdrop />}
    </>,
    document.querySelector("body")!
  );
};

export default Loader;
