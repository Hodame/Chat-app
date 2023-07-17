import { createContext } from "react";

const UserContext = createContext(false)

type AuthContextProviderProps = {
  children: JSX.Element
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <UserContext.Provider>
    <Children/>
    < /UserContext.Provider>
  )
}

export const UserAuth = () => UserContext(UserContext)