import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import useClickOutside from "../../hooks/useClickOutside";
import Avatar from "../common/Avatar";
import UserMenu from "./UserMenu";

const UserProfile = () => {
  const { state } = useAuthContext();
  const { username, isAuthenticated } = state;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const isClickOutside = useClickOutside(ref);

  useEffect(() => {
    if (isClickOutside) setIsOpen(false);
  }, [isClickOutside]);

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={ref}>
      <Avatar username={username} onClick={() => setIsOpen(true)} />
      {isOpen && <UserMenu />}
    </div>
  );
};

export default UserProfile;
