import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VerifyEmail from "./components/auth/VerifyEmail";
import AuthContextProvider from "./context/auth-context";
import Layout from "./layout";
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home page</div>,
  },
  {
    path: "auth",
    element: <AuthPage />,
  },
  {
    path: "verify_email",
    element: <VerifyEmail />,
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
