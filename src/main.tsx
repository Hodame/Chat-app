import "./index.css"

import { ChakraBaseProvider, ColorModeScript } from "@chakra-ui/react"
import { theme } from "./theme/theme.tsx"
import { BrowserRouter } from "react-router-dom"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <ChakraBaseProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraBaseProvider>
    </React.StrictMode>
  </>
)
