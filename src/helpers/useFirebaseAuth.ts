import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase/config"
import useUserStore, { User } from "@/store/userStore";
import { child, get, ref } from "firebase/database";

export const useAuthListener = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCheckingStatus, setCheckingStatus] = useState(true);
  const [userId, setUserId] = useState<string | null>(null)

  const writeUser = useUserStore(state => state.writeUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        await get(child(ref(db), 'users/' + userId)).then((user) => {
          if (user.exists()) {
            const userData = user.val() as User
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
    onAuthStateChanged(auth, (user) => {
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
