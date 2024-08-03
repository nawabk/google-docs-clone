import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  username: string;
  closeIconClickHandler: () => void;
};
const UserTag = ({ username, closeIconClickHandler }: Props) => {
  return (
    <div className="py-1 px-2 rounded-2xl border border-black w-44 bg-sky-50 flex justify-between items-center">
      <p className="text-sm">{username}</p>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="text-red-600 cursor-pointer"
        onClick={closeIconClickHandler}
      />
    </div>
  );
};

export default UserTag;
