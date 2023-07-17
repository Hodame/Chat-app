import { useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/config"

const useFirebaseAuth = async () => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  return isLoggedIn
}

export default useFirebaseAuth