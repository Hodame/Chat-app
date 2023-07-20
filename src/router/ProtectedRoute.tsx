import { useAuthListener } from "@/helpers/useFirebaseAuth"
import { Spinner } from "@chakra-ui/react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isCheckingStatus, isLoggedIn } = useAuthListener()

  return (
    <>
      {isCheckingStatus ? (
        <div className="screen-center">
          <Spinner size={"xl"} />
        </div>
      ) : isLoggedIn ? (
        <>{children}</>
      ) : (
        <Navigate to={"/auth"} />
      )}
    </>
  )
}

export default ProtectedRoute
