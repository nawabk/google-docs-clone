import { ComponentProps } from "react";

type Props = ComponentProps<"button">;
const ShowMoreResult = ({ ...rest }: Props) => {
  return (
    <button className="text-blue-600 py-2" {...rest}>
      Show more results &rarr;
    </button>
  );
};

export default ShowMoreResult;
