import "./index.css"

import { ChakraBaseProvider, ColorModeScript } from "@chakra-ui/react"
import { theme } from "./theme/theme.tsx"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </React.StrictMode> 
  </>
)
