import { useState } from "react"

import { useAuthListener } from "@/helpers/useFirebaseAuth"
import { Button, Spinner } from "@chakra-ui/react"
import { Navigate } from "react-router-dom"

import Login from "./Login"
import Register from "./Register"

export default function Auth() {
  const { isLoggedIn, isCheckingStatus } = useAuthListener()
  const [isLogin, setLogin] = useState(true)

  return (
    <div>
      {isCheckingStatus ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner size={"xl"} />
        </div>
      ) : isLoggedIn ? (
        <Navigate to={"/"} />
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-semibold text-4xl">MessengerX</h1>
            <p className="font-medium text-xl text-light">Join and discover a new world of communication</p>
          </div>
          {isLogin ? <Login /> : <Register />}
          <div className="mt-3 flex justify-center">
            <Button onClick={() => setLogin((value) => (value = !value))} rounded={"full"} variant={"ghost"}>
              <p>{isLogin ? "Register" : "Login"}</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
