import { SearchUserResponse } from "../../types/auth";
import Avatar from "../common/Avatar";

type Props = {
  user: SearchUserResponse;
  onClick: () => void;
};
const SearchedUser = ({ user, onClick }: Props) => {
  const { username, email } = user;
  return (
    <div
      className="flex gap-2 items-center cursor-pointer px-1 py-2 rounded-md hover:bg-gray-200"
      onClick={onClick}
    >
      <Avatar username={username} />
      <div className="flex flex-col">
        <p>{username}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default SearchedUser;
