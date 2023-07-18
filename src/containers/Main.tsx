import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuthListener } from "@/helpers/useFirebaseAuth"
import { Spinner } from "@chakra-ui/react"

import SideBar from "../components/SideBar/SideBar"
import { useEffect } from "react"

export default function Main() {
  const location = useLocation()
  const { isLoggedIn, isCheckingStatus } = useAuthListener()

  return (
    <>
      {isCheckingStatus ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner size={"xl"} />
        </div>
      ) : isLoggedIn ? (
        <div className="grid grid-cols-[450px,1fr] h-screen overflow-hidden">
          <div>
            <SideBar />
          </div>
          <div>
            {location.pathname === "/" ? (
              <div className="h-full w-full flex items-center justify-center">
                <p className="font-semibold text-xl">Select the chat</p>
              </div>
            ) : null}
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  )
}
