import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import { useAuthContext } from "../../context/auth-context";
import { useDocumentContext } from "../../context/document-context";
import useFetch from "../../hooks/useFetch";
import { CreateDocumentRequest, Document } from "../../types/document";
import Loader from "../common/Loader";

const CreateNewDocument = () => {
  const { state } = useAuthContext();
  const { status, apiCall, error } = useFetch();
  const { dispatch } = useDocumentContext();
  const { _id: userId } = state;
  const navigate = useNavigate();
  const createDocumentHandler = async () => {
    const responseData = await apiCall<Document, CreateDocumentRequest>({
      url: ENDPOINT.BASE + ENDPOINT.DOCUMENT.CREATE,
      method: "POST",
      body: {
        userId,
      },
    });
    if (responseData) {
      dispatch({
        type: "SET_SELECTED_DOCUMENT",
        payload: {
          document: responseData,
        },
      });
      navigate(`/document/${responseData._id}`);
    }
  };
  return (
    <div
      className="h-40 w-32 border rounded-md border-gray-300 flex justify-center flex-col gap-2 items-center hover:border-blue-600 cursor-pointer"
      onClick={createDocumentHandler}
    >
      <FontAwesomeIcon icon={faPlus} size="2x" className="text-blue-600" />
      <p className="text-xs text-gray-500">Create Document</p>
      {status === "loading" && <Loader backdrop={true} />}
    </div>
  );
};

export default CreateNewDocument;
