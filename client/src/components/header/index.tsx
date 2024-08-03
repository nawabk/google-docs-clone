import googlDocsLogo from "../../assets/google-docs.png";
import { useDocumentContext } from "../../context/document-context";
import ShareDoc from "../share-doc";
import UserProfile from "../user-profile";

const Header = () => {
  const { state } = useDocumentContext();
  const { isDocumentPageActive } = state;
  return (
    <header className="grid grid-cols-2 px-0.5 py-3 z-10 shadow">
      <div className="col-span-1">
        <div className="flex items-center">
          <img src={googlDocsLogo} alt="Google docs logo" />
          <h1 className="text-2xl">Google Docs Clone</h1>
        </div>
      </div>
      <div className="col-span-1 flex justify-end gap-6 mr-4 items-center">
        {isDocumentPageActive && <ShareDoc />}
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
