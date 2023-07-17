import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/config"

const useFirebaseAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

    return () => {
      listen()
    }
  }, [])

  return isLoggedIn
}

export default useFirebaseAuth