import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ENDPOINT } from "../../constants";
import { useDocumentContext } from "../../context/document-context";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import useFetch from "../../hooks/useFetch";
import { SearchUserResponse } from "../../types/auth";
import {
  DocPermission,
  Document,
  ShareDocumentRequest,
} from "../../types/document";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import NotifyPeople from "./NotifyPeople";
import PermissionDropdown from "./PermissionDropdown";
import SearchedUser from "./SearchedUser";
import ShareDocButton from "./ShareDocButton";
import ShowMoreResult from "./ShowMoreResult";
import UserTag from "./UserTag";

const ShareDoc = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<SearchUserResponse[]>([]);
  const [doNotifyPeople, setDoNotifyPeople] = useState<boolean>(true);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [permission, setPermission] = useState<DocPermission>(
    DocPermission.Editor
  );
  const { status, apiCall } = useFetch();
  const { state, dispatch } = useDocumentContext();
  const { selectedDocument } = state;

  if (!selectedDocument) return null;

  const documentTitle = selectedDocument.name ?? "Untitled Document";
  const documentId = selectedDocument._id;

  const sendClickHandler = async () => {
    const url =
      ENDPOINT.BASE +
      ENDPOINT.DOCUMENT.SHARE.replace("{documentId}", documentId);
    const response = await apiCall<Document, ShareDocumentRequest>({
      url,
      method: "POST",
      body: {
        notifyPeople: doNotifyPeople,
        notificationMessage,
        documentTitle,
        sharedWith: selectedUsers.map((user) => ({
          user: user._id,
          email: user.email,
          access: permission,
        })),
      },
    });
    if (response) {
      dispatch({
        type: "SET_SELECTED_DOCUMENT",
        payload: {
          document: response.data,
        },
      });
    }
  };

  return (
    <>
      <ShareDocButton onClick={() => setOpen(true)} />
      <Modal
        heading="Share"
        submitButton="Send"
        open={open}
        setOpen={setOpen}
        submitHandler={sendClickHandler}
      >
        <div className="flex gap-2">
          <Search setSelectedUsers={setSelectedUsers} />
          {selectedUsers.length > 0 && (
            <PermissionDropdown
              permission={permission}
              setPermission={setPermission}
            />
          )}
        </div>
        <div className="flex gap-2 flex-wrap max-h-24 overflow-auto mt-4 py-2">
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => (
              <UserTag
                key={user._id}
                username={user.username}
                closeIconClickHandler={() =>
                  setSelectedUsers((prev) =>
                    prev.filter((prevUser) => prevUser._id !== user._id)
                  )
                }
              />
            ))}
        </div>
        {selectedUsers.length > 0 && (
          <NotifyPeople
            doNotifyPeople={doNotifyPeople}
            setDoNotifyPeople={setDoNotifyPeople}
            notificationMessage={notificationMessage}
            setNotificationMessage={setNotificationMessage}
          />
        )}
      </Modal>
    </>
  );
};

const Search = ({
  setSelectedUsers,
}: {
  setSelectedUsers: Dispatch<SetStateAction<SearchUserResponse[]>>;
}) => {
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
    <div className="relative flex-1" ref={ref}>
      <input
        type="text"
        placeholder="Add People"
        className="w-full h-12 px-2 py-2 border border-gray-600 rounded-lg outline-none placeholder-gray-500 placeholder:font-light placeholder:text-sm"
        onChange={debouncedChangeHandler}
        onFocus={() => setShowResult(true)}
      />
      <SearchResult
        text={inputValue}
        setSelectedUsers={setSelectedUsers}
        setShowResult={setShowResult}
        showResult={showResult}
      />
    </div>
  );
};

const SearchResult = ({
  text,
  setSelectedUsers,
  setShowResult,
  showResult,
}: {
  text: string;
  setSelectedUsers: Dispatch<SetStateAction<SearchUserResponse[]>>;
  setShowResult: Dispatch<boolean>;
  showResult: boolean;
}) => {
  const { status, apiCall } = useFetch();
  const [users, setUsers] = useState<SearchUserResponse[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState<boolean>(false);

  const fetchUsers = useCallback(
    async (currPage: string) => {
      const url = new URL(ENDPOINT.BASE + ENDPOINT.AUTH.SEARCH);
      url.searchParams.append("text", text);
      url.searchParams.append("page", currPage);
      url.searchParams.append("limit", "10");
      const response = await apiCall<SearchUserResponse[], void, true>({
        url: url.toString(),
      });
      if (response) {
        const { data, totalPage, currPage } = response;
        setCurrPage(currPage);
        setUsers((users) => {
          if (currPage === 1) return data;
          return [...users, ...data];
        });
        setShowSeeMoreButton(currPage < totalPage);
      }
    },
    [apiCall, text]
  );

  useEffect(() => {
    if (!text) {
      setUsers([]);
      setCurrPage(1);
      return;
    }
    fetchUsers("1");
  }, [fetchUsers, text]);

  let content: React.ReactNode;
  if (text) {
    content = (
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <SearchedUser
              key={user._id}
              user={user}
              onClick={() => {
                setSelectedUsers((prev) => {
                  if (prev.some((prevUser) => prevUser._id === user._id)) {
                    return prev;
                  }
                  return [...prev, user];
                });
                setShowResult(false);
              }}
            />
          ))}
        </div>
        {showSeeMoreButton && (
          <ShowMoreResult
            onClick={() => {
              if (status === "loading") return;
              fetchUsers((currPage + 1).toString());
            }}
          />
        )}
        {status === "loading" && (
          <div className="self-center py-2">
            <Spinner />
          </div>
        )}
      </div>
    );
  } else {
    content = (
      <p className="text-gray-400 text-md text-center">
        Type name or email to search...
      </p>
    );
  }
  return (
    <div
      className={`absolute top-12 left-0 w-full bg-white shadow p-4 rounded-lg max-h-56 overflow-auto ${
        showResult ? "visible" : "hidden"
      }`}
    >
      {content}
    </div>
  );
};

export default ShareDoc;
