import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import useClickOutside from "../../hooks/useClickOutside";
import UserMenu from "./UserMenu";

const Avatar = () => {
  const { state } = useAuthContext();
  const { username, isAuthenticated } = state;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const isClickOutside = useClickOutside(ref);

  useEffect(() => {
    if (isClickOutside) setIsOpen(false);
  }, [isClickOutside]);

  if (!isAuthenticated) return null;
  const displayChar = username[0].toUpperCase();
  return (
    <div className="relative" ref={ref}>
      <div
        className="py-2 px-4 text-center bg-pink-700 text-white rounded-full text-2xl font-bold cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {displayChar}
      </div>
      {isOpen && <UserMenu />}
    </div>
  );
};

export default Avatar;
