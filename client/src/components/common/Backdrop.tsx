import { createPortal } from "react-dom";

type Props = {
  onClick?: () => void;
};
const Backdrop = ({ onClick }: Props) => {
  return createPortal(
    <div
      className="absolute left-0 right-0 bottom-0 top-0 z-20 bg-zinc-400/[.5]"
      onClick={() => {
        if (onClick) onClick();
      }}
    ></div>,
    document.querySelector("body")!
  );
};

export default Backdrop;
