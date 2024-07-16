import DocumentTitle from "./DocumentTitle";
import QuillEditor from "./QuillEditor";

const Document = () => {
  //   const { documentId } = useParams<{ documentId: string }>();
  return (
    <div className="mt-10">
      <div className="text-center">
        <DocumentTitle />
      </div>
      <QuillEditor />
    </div>
  );
};

export default Document;
