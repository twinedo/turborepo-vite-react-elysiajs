import { createBrowserRouter } from "react-router";
import App from "../App";
import { CV, Projects } from "../screens";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/cv",
    element: <CV />,
  },
]);