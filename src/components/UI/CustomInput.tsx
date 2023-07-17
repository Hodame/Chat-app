import { Icon } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"
import { IconType } from "react-icons"

type CustomInputProps = {
  size?: "lg" | "xl"
  onInput?: ChangeEventHandler<HTMLInputElement>
  hintText: string
  leftIcon?: IconType
  rightIcon?: IconType
  type?: "password" | "text"
}

export default function CustomInput({ type = 'text', onInput, hintText, leftIcon, rightIcon, size }: CustomInputProps) {
  return (
    <div className="bg-surface rounded-3xl w-full relative text-light">
      {leftIcon ? <Icon className="absolute left-4 top-[50%] -translate-y-[50%]" w={7} h={7} as={leftIcon} /> : null}
      <input
        onChange={onInput}
        className={
          "bg-transparent w-full px-14 py-3 text-white rounded-3xl " +
          (size === "lg" ? "h-16 text-lg" : "") +
          (size === "xl" ? "h-20 text-2xl" : "")
        }
        placeholder={hintText}
        type={type}
      />
      {rightIcon ? <Icon className="absolute right-4 top-[50%] -translate-y-[50%]" w={7} h={7} as={rightIcon} /> : null}
    </div>
  )
}
