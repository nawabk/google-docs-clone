import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ENDPOINT } from "../../constants";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";
import { UserResponse } from "../../types/auth";
import { SuccessfullResponse } from "../../types/common";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import ShareDocButton from "./ShareDocButton";

const ShareDoc = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ShareDocButton onClick={() => setOpen(true)} />
      <Modal heading="Share" submitButton="Done" open={open} setOpen={setOpen}>
        <Search />
      </Modal>
    </>
  );
};

const Search = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const isCLickOutside = useClickOutside(ref, true);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  useEffect(() => {
    if (isCLickOutside) setShowResult(false);
  }, [isCLickOutside]);
  const debouncedChangeHandler = useDebounce(changeHandler);
  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        placeholder="Add People"
        className="w-full h-12 px-2 py-2 border border-gray-600 rounded-lg outline-none placeholder-gray-500 placeholder:font-light placeholder:text-sm"
        onChange={debouncedChangeHandler}
        onFocus={() => setShowResult(true)}
      />
      {showResult && <SearchResult text={inputValue} />}
    </div>
  );
};

const SearchResult = ({ text }: { text: string }) => {
  const { status, apiCall } = useFetch();
  const [users, setUsers] = useState<
    SuccessfullResponse<UserResponse>["data"][]
  >([]);

  useEffect(() => {
    async function fetchUsers() {
      const url = new URL(ENDPOINT.BASE + ENDPOINT.AUTH.SEARCH);
      url.searchParams.append("text", text);
      const users = await apiCall<UserResponse[]>({
        url: url.toString(),
      });
      if (users) {
        setUsers(users);
      }
    }
    if (text) {
      fetchUsers();
    }
  }, [text]);

  let content: React.ReactNode = (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
  if (text) {
    if (status === "success") {
      content = users.map((user) => <div key={user._id}>{user.username}</div>);
    }
  } else {
    content = (
      <p className="text-gray-400 text-md text-center">
        Type name or email to search...
      </p>
    );
  }
  return (
    <div className="absolute top-12 left-0 w-full bg-white shadow p-4 rounded-lg">
      {content}
    </div>
  );
};

export default ShareDoc;
