import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { HiFlag, HiTrash } from "react-icons/hi"
import { IoMdNotificationsOff } from "react-icons/io"
type ChatSelectMenuProps = {
  button: JSX.Element
}

export default function ChatSelectMenu({ button }: ChatSelectMenuProps) {
  return (
    <Menu>
      <MenuButton rounded={"3xl"} as={Button} variant={"ghost"}>
        {button}
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Icon fontSize={"2xl"} as={IoMdNotificationsOff} className="mr-3" />
          <span>Mute chat</span>
        </MenuItem>
        <MenuItem>
          <Icon fontSize={"2xl"} as={HiFlag} className="mr-3" />
          <span>Report</span>
        </MenuItem>
        <MenuItem>
          <Icon fontSize={"2xl"} as={HiTrash} className="mr-3" />
          <span>Delete chat</span>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
