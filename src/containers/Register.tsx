import { Button } from "@chakra-ui/react";
import CustomInput from "../components/UI/CustomInput";
import { HiLockClosed, HiMail } from "react-icons/hi";

export default function Register() {
  return (
    <div>
      <div className=" mt-14 flex w-96 flex-col gap-4">
        <CustomInput size="lg" leftIcon={HiMail} hintText="Email" />
        <CustomInput size="lg" leftIcon={HiLockClosed} hintText="Password" />
        <Button size={"lg"}>
          <p>Register</p>
        </Button>
      </div>
      <div className="mt-3">
        <Button rounded={"full"} variant={"ghost"}>
          <p>Login</p>
        </Button>
      </div>
    </div>
  );
}
