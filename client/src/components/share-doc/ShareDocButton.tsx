import { ComponentProps } from "react";

type Props = ComponentProps<"button">;
const ShareDocButton = ({ ...rest }: Props) => {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500"
      {...rest}
    >
      Share
    </button>
  );
};

export default ShareDocButton;
