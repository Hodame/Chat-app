import { Link, Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuthListener } from "@/hooks/useFirebaseAuth"
import { Spinner } from "@chakra-ui/react"

import SideBar from "../components/SideBar/SideBar"
import { useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore"
import useUserStore from "@/store/userStore"
import { db } from "@/firebase/config"

export default function Main() {
  const location = useLocation()
  const user = useUserStore((state) => state.user)
  const { isLoggedIn, isCheckingStatus } = useAuthListener()

  useEffect(() => {
    if (isLoggedIn && user.userID.length > 0) {
      updateDoc(doc(db, "users", user.userID), {
        isOnline: true,
        lastOnline: new Date()
      })

      document.addEventListener("visibilitychange", () => {
        updateDoc(doc(db, "users", user.userID), {
          isOnline: document.visibilityState === "visible",
          lastOnline: new Date()
        })
      })

      window.addEventListener("beforeunload", () => {
        updateDoc(doc(db, "users", user.userID), {
          isOnline: false,
          lastOnline: new Date()
        })
      })

      return () => {
        updateDoc(doc(db, "users", user.userID), {
          isOnline: false,
          lastOnline: new Date()
        })
      }
    }
  }, [isLoggedIn])
  return (
    <>
      {isCheckingStatus ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner size={"xl"} />
        </div>
      ) : isLoggedIn ? (
        <div className="grid grid-cols-[0.35fr,1fr] h-screen overflow-hidden">
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
