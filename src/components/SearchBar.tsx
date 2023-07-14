import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"
import { HiSearch } from "react-icons/hi"

type SearchBarProps = {
  hintText: string,
  onSearch: ChangeEventHandler
}

export default function SearchBar({ hintText, onSearch }: SearchBarProps) {
  return(
    <InputGroup> 
      <InputLeftElement>
        <Icon color='gray.300' w={5} h={5} as={HiSearch}/>
      </InputLeftElement>
      <Input onChange={onSearch}  placeholder={hintText}/>
    </InputGroup>
  )
}