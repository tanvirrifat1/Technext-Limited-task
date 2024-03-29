import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";
import Main from "../Layout/Main";
import Details from "../component/Details";
import User from "../component/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);
