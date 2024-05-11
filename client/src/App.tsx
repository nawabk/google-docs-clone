import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
