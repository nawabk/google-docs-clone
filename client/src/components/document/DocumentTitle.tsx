import { ChangeEvent, useRef } from "react";
import { useDocumentContext } from "../../context/document-context";

const DocumentTitle = () => {
  const { state } = useDocumentContext();
  const { selectedDocument } = state;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!selectedDocument) return null;

  const { name } = selectedDocument;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target.value;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {}, 500);

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
