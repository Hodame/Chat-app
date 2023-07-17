import { Navigate, RouteObject } from "react-router-dom";

import Main from "@/containers/Main"
import Auth from "@/containers/Auth.tsx"
import Chat from "@/containers/Chat.tsx"

const routes = (isLoggedIn?: boolean): RouteObject[] => [
  {
    path: "/",
    element: isLoggedIn ? <Main /> : <Navigate to="/auth" />,
    children: [
      {
        path: "/:chatID",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/auth",
    element: !isLoggedIn ? <Auth/> : <Navigate to="/" />,
  },
]

export default routes