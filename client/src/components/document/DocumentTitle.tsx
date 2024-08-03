import { ChangeEvent, useRef } from "react";
import { ENDPOINT } from "../../constants";
import { useDocumentContext } from "../../context/document-context";
import useFetch from "../../hooks/useFetch";

const DocumentTitle = () => {
  const { state, dispatch } = useDocumentContext();
  const { selectedDocument } = state;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { status, apiCall } = useFetch();

  if (!selectedDocument) return null;

  const { name, _id } = selectedDocument;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const url =
        ENDPOINT.BASE + ENDPOINT.DOCUMENT.UPDATE.replace("{documentId}", _id);
      const response = await apiCall({
        url,
        method: "PATCH",
        body: {
          name: value,
        },
      });
      if (response) {
        dispatch({
          type: "UPDATE_SELECTED_DOCUMENT",
          payload: {
            updatedDocument: {
              name: value,
            },
          },
        });
      }
    }, 500);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  };

  return (
    <input
      type="text"
      className="border-none outline-none text-4xl mb-5"
      defaultValue={name ? name : "Untitled Document"}
      onFocus={(e) => e.target.select()}
      onChange={inputChangeHandler}
    />
  );
};

export default DocumentTitle;
