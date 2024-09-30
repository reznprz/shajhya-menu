import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import Providers from "../../Providers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: ROUTES,
  },
]);
