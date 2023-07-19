import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore";
import useUserStore, { User } from "@/store/userStore";

export const useAuthListener = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCheckingStatus, setCheckingStatus] = useState(true);
  const [userId, setUserId] = useState<string | null>(null)

  const writeUser = useUserStore(state => state.writeUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        await getDoc(doc(db, 'users', userId!)).then((user) => {
          if (user.exists()) {
            const userData = user.data() as User
            writeUser(userData)
            return
          }
          writeUser({
            username: "",
            userID: "",
            email: "",
            photoURL: null,
            chats: null
          })
        })
      } catch (error) {
        alert(error)
      }
    }

    if (userId) {
      getUser()
      return
    }

    writeUser({
      username: "",
      userID: "",
      email: "",
      photoURL: null,
      chats: null
    })
  }, [userId])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true)
        setUserId(user.uid)
        setCheckingStatus(false);
        return
      }
      setUserId(null)
      setCheckingStatus(false);
    });
  }, []);

  return { isLoggedIn, isCheckingStatus, userId };
};
