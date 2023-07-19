import { Button } from "@chakra-ui/react"
import { HiLockClosed, HiMail, HiUser } from "react-icons/hi"
import { MouseEventHandler, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/firebase/config"
import { doc, setDoc } from "firebase/firestore"

import CustomInput from "../components/UI/CustomInput"
import { useNavigate } from "react-router-dom"

type RegisterProps = {
  goLogin: MouseEventHandler<HTMLButtonElement>
}

export default function Register({ goLogin }: RegisterProps) {
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  async function register() {
    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password).then((user) =>
        writeUserData(user.user.uid, user.user.email!, username, user.user.photoURL)
      )
      navigate("/")
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  async function writeUserData(userID: string, email: string, username: string, photoURL: string | null) {
    setDoc(doc(db, "users", userID), {
      userID: userID,
      email: email,
      username: username,
      photoURL: photoURL,
    })
  }

  return (
    <div>
      <div className=" mt-14 flex w-96 flex-col gap-4">
        <CustomInput onInput={(e) => setUsername(e.target.value)} size="lg" leftIcon={HiUser} hintText="Username" />
        <CustomInput onInput={(e) => setEmail(e.target.value)} size="lg" leftIcon={HiMail} hintText="Email" />
        <CustomInput
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          size="lg"
          leftIcon={HiLockClosed}
          hintText="Password"
        />
        <Button onClick={register} isLoading={isLoading} size={"lg"}>
          <p>Register</p>
        </Button>
      </div>
      <div className="mt-3 flex justify-center">
        <Button onClick={goLogin} rounded={"full"} variant={"ghost"}>
          <p>Login</p>
        </Button>
      </div>
    </div>
  )
}
