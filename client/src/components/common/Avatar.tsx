import { ComponentProps } from "react";

type Props = { username: string } & ComponentProps<"div">;
const Avatar = ({ username, ...rest }: Props) => {
  const displayChar = username[0].toUpperCase();
  return (
    <div
      className="py-2 px-4 text-center bg-pink-700 text-white rounded-full text-2xl font-bold cursor-pointer"
      {...rest}
    >
      {displayChar}
    </div>
  );
};

export default Avatar;
