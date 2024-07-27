import { useEffect } from "react";
import Document from "../components/document/Document";
import { useDocumentContext } from "../context/document-context";

const DocumentPage = () => {
  const { dispatch } = useDocumentContext();
  useEffect(() => {
    dispatch({ type: "SET_DOCUMENT_PAGE_ACTIVE", payload: { isActive: true } });
    return () => {
      dispatch({
        type: "SET_DOCUMENT_PAGE_ACTIVE",
        payload: { isActive: false },
      });
    };
  }, []);
  return (
    <div className="col-span-full">
      <Document />
    </div>
  );
};

export default DocumentPage;
