import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './containers/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/home',
    element: <App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
