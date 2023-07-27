import { User } from "@/store/userStore";
import { createContext } from "react";

export const ReciverContext = createContext<User>({
  username: "",
  userID: "",
  email: "",
  photoURL: null
})