import { Icon } from "@chakra-ui/react"
import { ChangeEventHandler, FocusEventHandler } from "react"
import { HiSearch } from "react-icons/hi"

type SearchBarProps = {
  value: string
  hintText?: string
  onSearch?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
}

export default function SearchBar({ value, hintText, onSearch, onFocus }: SearchBarProps) {
  return (
    <div className="bg-surface rounded-3xl relative text-light">
      <Icon className="absolute left-4 top-[50%] -translate-y-[50%]" w={7} h={7} as={HiSearch} />
      <input
        value={value}
        onFocus={onFocus}
        onChange={onSearch}
        className="bg-transparent w-full px-3 py-5 pl-14 text-white rounded-3xl"
        placeholder={hintText}
        type="text"
      />
    </div>
  )
}
