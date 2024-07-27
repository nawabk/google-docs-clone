import CreateNewDocument from "../components/document/CreateNewDocument";
import DocumentList from "../components/document/DocumentList";

const DocumentListPage = () => {
  return (
    <div className="col-span-full pt-8 flex justify-center gap-8 flex-wrap">
      <CreateNewDocument />
      <DocumentList />
    </div>
  );
};

export default DocumentListPage;
