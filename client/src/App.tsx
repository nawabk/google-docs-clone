import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import VerifyEmail from "./components/auth/VerifyEmail";
import AuthContextProvider from "./context/auth-context";
import Layout from "./layout";
import AuthPage from "./pages/Auth";
import Document from "./pages/Document";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/document" />,
  },
  {
    path: "document",
    element: (
      <PrivateRoute>
        <Document />
      </PrivateRoute>
    ),
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
