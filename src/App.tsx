import { Route, Routes } from "react-router-dom"
import Main from "./containers/Main"
import ProtectedRoute from "./router/ProtectedRoute"
import Auth from "./containers/Auth"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  )
}
