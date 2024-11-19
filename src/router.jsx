import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Global from "./layouts/GlobalLayout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";

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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
