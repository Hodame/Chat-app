import { useAuthListener } from "@/helpers/useFirebaseAuth"
import { Spinner } from "@chakra-ui/react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ Childer }: { Childer: JSX.Element }) {
  const { isLoggedIn, isCheckingStatus } = useAuthListener()

  return <>{isCheckingStatus ? <Spinner size={"xl"} /> : isLoggedIn ? { Childer } : <Navigate to={"auth"} />}</>
}
