import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from "./containers/Chat.tsx";
import { ChakraBaseProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme/theme.tsx";
import Auth from "./containers/Auth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:chatID",
        element: <Chat />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  </React.StrictMode>
);
