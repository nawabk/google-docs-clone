import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
