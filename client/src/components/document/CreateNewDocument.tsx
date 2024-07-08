import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateNewDocument = () => {
  return (
    <div className="h-40 w-32 border rounded-md border-gray-300 flex justify-center flex-col gap-2 items-center hover:border-blue-600 cursor-pointer">
      <FontAwesomeIcon icon={faPlus} size="2x" className="text-blue-600" />
      <p className="text-xs text-gray-500">Create Document</p>
    </div>
  );
};

export default CreateNewDocument;
