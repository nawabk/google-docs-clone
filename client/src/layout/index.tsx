import Header from "../components/header";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      <main className="container mx-auto grid grid-cols-8 relative" id="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
