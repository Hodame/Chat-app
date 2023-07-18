import { Button } from "@chakra-ui/react"
import { HiLockClosed, HiMail } from "react-icons/hi"
import { MouseEventHandler, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/config"

import CustomInput from "../components/UI/CustomInput"
import { useNavigate } from "react-router-dom"

type LoginProps = {
  goRegister: MouseEventHandler<HTMLButtonElement>
}

export default function Login({ goRegister }: LoginProps) {
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login() {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className=" mt-14 flex w-96 flex-col gap-4">
        <CustomInput onInput={(e) => setEmail(e.target.value)} size="lg" leftIcon={HiMail} hintText="Email" />
        <CustomInput
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          size="lg"
          leftIcon={HiLockClosed}
          hintText="Password"
        />
        <Button onClick={login} isLoading={isLoading} size={"lg"}>
          <p>Login now!</p>
        </Button>
      </div>
      <div className="mt-3 flex justify-center">
        <Button onClick={goRegister} rounded={"full"} variant={"ghost"}>
          <p>Register</p>
        </Button>
      </div>
    </div>
  )
}
