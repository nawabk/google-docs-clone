import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import { useDocumentContext } from "../../context/document-context";
import useFetch from "../../hooks/useFetch";
import type { Document } from "../../types/document";
import Loader from "../common/Loader";
import DocumentTitle from "./DocumentTitle";
import QuillEditor from "./QuillEditor";

const Document = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { state, dispatch } = useDocumentContext();
  const { selectedDocument } = state;
  const { status, apiCall } = useFetch();

  useEffect(() => {
    async function fetchDocument() {
      if (documentId) {
        const url =
          ENDPOINT.BASE +
          ENDPOINT.DOCUMENT.GET.replace("{documentId}", documentId);
        const response = await apiCall<Document>({
          url,
        });
        if (response) {
          const { data: document } = response;
          dispatch({
            type: "SET_SELECTED_DOCUMENT",
            payload: {
              document,
            },
          });
        }
      }
    }
    if (!selectedDocument || selectedDocument._id !== documentId) {
      //fetch document
      fetchDocument();
    }
  }, [selectedDocument, documentId, apiCall, dispatch]);
  return (
    <div className="mt-10">
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className="text-center">
            <DocumentTitle />
          </div>
          <QuillEditor />
        </>
      )}
    </div>
  );
};

export default Document;
