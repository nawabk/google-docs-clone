import { createPortal } from "react-dom";

const Backdrop = () => {
  return createPortal(
    <div className="absolute left-0 right-0 bottom-0 top-0 z-20 bg-zinc-400/[.5]"></div>,
    document.querySelector("body")!
  );
};

export default Backdrop;
