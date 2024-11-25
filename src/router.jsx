import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Global from "./layouts/GlobalLayout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import AuthorProfile from "./pages/AuthorProfile";
import Article from "./pages/Article";

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
        path: "/articles/:id",
        element: <Article />,
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
