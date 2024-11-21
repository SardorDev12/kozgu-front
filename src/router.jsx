import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Global from "./layouts/GlobalLayout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import AuthorProfile from "./pages/AuthorProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Global />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/author",
        element: <AuthorProfile />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
