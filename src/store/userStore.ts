import { create } from "zustand";

export type User = {
  username: string
  email: string
  userID: string
  photoURL: string | null
  chats: string[] | null

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
    chats: null
  },
  writeUser: (user) => set(_state => ({ user: user }))
}))

export default useUserStore