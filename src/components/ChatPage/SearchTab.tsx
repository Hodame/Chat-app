/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Icon } from "@chakra-ui/react"
import CustomInput from "../UI/CustomInput"
import { HiSearch, HiX } from "react-icons/hi"
import { MouseEventHandler } from "react"

type SearchTabProps = {
  closeSearchBar: MouseEventHandler<HTMLButtonElement>
}

export default function SearchTab({ closeSearchBar }: SearchTabProps) {
  return (
    <div className="p-4">
      <div className="flex gap-2 items-center">
        <Button
          onClick={closeSearchBar}
          className="text-xl"
          background={"surface"}
          rounded={"full"}
          h={"42px"}
          w={"42px"}
        >
          <Icon h={5} w={5} as={HiX} />
        </Button>
        <CustomInput hintText="Search..." leftIcon={HiSearch} />
      </div>
      <div>
        <p className="font-semibold mt-2 text-light">Search for messages</p>
      </div>
    </div>
  )
}
