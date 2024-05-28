import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
