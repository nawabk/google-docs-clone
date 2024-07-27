import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import VerifyEmail from "./components/auth/VerifyEmail";
import AuthContextProvider from "./context/auth-context";
import { DocumentContextProvider } from "./context/document-context";
import Layout from "./layout";
import DocumentListPage from "./pages/DocumentListPage";
import DocumentPage from "./pages/DocumentPage";
import PrivateRoute from "./utils/PrivateRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/document" />,
//   },
//   {
//     path: "document",
//     element: (
//       <PrivateRoute>
//         <DocumentList />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "document/:documentId",
//     element: (
//       <PrivateRoute>
//         <DocumentPage />
//       </PrivateRoute>
//     ),
//   },
//   {
//     path: "signup",
//     element: <Signup />,
//   },
//   {
//     path: "signin",
//     element: <SignIn />,
//   },
//   {
//     path: "verify_email",
//     element: <VerifyEmail />,
//   },
// ]);
function App() {
  return (
    <AuthContextProvider>
      <DocumentContextProvider>
        <BrowserRouter>
          <Layout>
            {/* <RouterProvider router={router} /> */}
            <Routes>
              <Route path="/" element={<Navigate to="/document" />} />
              <Route
                path="document"
                element={
                  <PrivateRoute>
                    <DocumentListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="document/:documentId"
                element={
                  <PrivateRoute>
                    <DocumentPage />
                  </PrivateRoute>
                }
              />
              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="verify_email" element={<VerifyEmail />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DocumentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
