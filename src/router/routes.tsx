import { BrowserRouter, Route, Routes } from "react-router-dom"

import Main from "@/containers/Main"
import Auth from "@/containers/Auth.tsx"
import Chat from "@/containers/Chat"

const RoutesRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Main />}>
        <Route path="/:chatID" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default RoutesRouter
