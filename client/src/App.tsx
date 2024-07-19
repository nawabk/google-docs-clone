import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import VerifyEmail from "./components/auth/VerifyEmail";
import AuthContextProvider from "./context/auth-context";
import { DocumentContextProvider } from "./context/document-context";
import Layout from "./layout";
import DocumentList from "./pages/DocumentList";
import DocumentPage from "./pages/DocumentPage";
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
        <DocumentList />
      </PrivateRoute>
    ),
  },
  {
    path: "document/:documentId",
    element: (
      <PrivateRoute>
        <DocumentPage />
      </PrivateRoute>
    ),
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "verify_email",
    element: <VerifyEmail />,
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <DocumentContextProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </DocumentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
