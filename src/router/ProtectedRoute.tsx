import useFirebaseAuth from "@/helpers/useFirebaseAuth"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isUser = useFirebaseAuth()

  if (!isUser) {
    return <Navigate to={"auth"} />
  }

  return children
}
