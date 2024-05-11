import googlDocsLogo from "../../assets/google-docs.png";

const Header = () => {
  return (
    <header className="grid grid-cols-2 px-0.5 py-3 z-10 shadow">
      <div className="col-span-1">
        <div className="flex items-center">
          <img src={googlDocsLogo} alt="Google docs logo" />
          <h1 className="text-2xl">Google Docs Clone</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
