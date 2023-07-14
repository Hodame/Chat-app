import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraBaseProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import Chat from './containers/Chat.tsx'

const theme = extendTheme(
  {
    fonts: {
      body: `'Montserrat', sans-serif`
    },
    colors: {
      primary: {
        main: "#ef233c",
        50: "#fff1f3",
        100: "#ffdfe3",
        200: "#ffc5cc",
        300: "#ff9ca8",
        400: "#ff6477",
        500: "#ff334c",
        600: "#ef233c",
        700: "#c80d24",
        800: "#a50f21",
        900: "#a50f21"
      }
    },
    components: {
      Input: {

      }
    }
  },
  withDefaultColorScheme({
    colorScheme: 'primary'
  }),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/:chatID',
        element: <Chat/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraBaseProvider>
  </React.StrictMode>,
)
