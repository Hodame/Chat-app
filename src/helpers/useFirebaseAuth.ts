import { useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore";
import useUserStore, { User } from "@/store/userStore";

export const useAuthListener = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCheckingStatus, setCheckingStatus] = useState(true);

  const writeUser = useUserStore(state => state.writeUser)

  async function writeUserToDatabase(userId: string) {
    const getUser = async () => {
      try {
        await getDoc(doc(db, 'users', userId)).then((user) => {
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
          })
        })
      } catch (error) {
        alert(error)
      }
    }

    if (userId) {
      await getUser()
      return
    }

    writeUser({
      username: "",
      userID: "",
      email: "",
      photoURL: null,
    })
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await writeUserToDatabase(user.uid)
      setLoggedIn(true)
      setCheckingStatus(false);
      return
    }
    setCheckingStatus(false);
  });

  return { isLoggedIn, isCheckingStatus };
};
