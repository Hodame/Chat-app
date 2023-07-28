import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type User = {
  username: string
  email: string
  userID: string
  photoURL: string | null
  lastOnline: Timestamp | null
  isOnline: boolean
}

type UserState = {
  user: User,
  writeUser: (user: User) => void
}

const useUserStore = create<UserState>()((set) => ({
  user: {
    username: "",
    email: "",
    userID: "",
    photoURL: null,
    lastOnline: null,
    isOnline: false
  },
  writeUser: (user) => set(() => ({ user: user }))
}))

export default useUserStore