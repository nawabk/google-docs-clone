import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import { useDocumentContext } from "../../context/document-context";
import useFetch from "../../hooks/useFetch";
import { Document } from "../../types/document";
import { formatDate } from "../../utils";

const DocumentList = () => {
  const { status, apiCall } = useFetch();
  const { state, dispatch } = useDocumentContext();
  const { documentList } = state;

  useEffect(() => {
    async function fetchDocumentList() {
      const response = await apiCall<Document[]>({
        url: ENDPOINT.BASE + ENDPOINT.DOCUMENT.GET_ALL,
      });
      if (response) {
        const { data: documentList } = response;
        dispatch({
          type: "SET_DOCUMENT_LIST",
          payload: {
            documentList,
          },
        });
      }
    }
    fetchDocumentList();
  }, []);

  return (
    status === "success" &&
    documentList.map((document) => (
      <DocumentCard key={document._id} document={document} />
    ))
  );
};

const DocumentCard = ({ document }: { document: Document }) => {
  const { _id, updatedAt } = document;
  const { dispatch } = useDocumentContext();
  const navigate = useNavigate();

  const navigateHandler = () => {
    dispatch({
      type: "SET_SELECTED_DOCUMENT",
      payload: {
        document,
      },
    });
    navigate(`/document/${_id}`);
  };
  return (
    <div
      className="h-40 w-48 p-4 border rounded-md border-gray-300 flex flex-col justify-between hover:border-blue-600 cursor-pointer"
      onClick={navigateHandler}
    >
      <div>
        <p className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {document.name}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Last Updated : {formatDate(new Date(updatedAt))}
        </p>
      </div>
      <div className="flex justify-between text-gray-600 ">
        <FontAwesomeIcon
          icon={faPen}
          className="hover:text-blue-600 cursor-pointer"
          onClick={navigateHandler}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="ml-2 hover:text-red-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DocumentList;
