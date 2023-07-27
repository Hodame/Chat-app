import { ReciverContext } from "@/context/ReciverContext"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { useContext, useRef } from "react"
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
        <DeleteDialogAlert />
      </MenuList>
    </Menu>
  )
}

function DeleteDialogAlert() {
  const reciver = useContext(ReciverContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  async function deleteChat() {}
  return (
    <>
      <MenuItem onClick={onOpen}>
        <Icon fontSize={"2xl"} as={HiTrash} className="mr-3" />
        <span>Delete chat</span>
      </MenuItem>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete this chat?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to delete this chat?</AlertDialogBody>
          <AlertDialogFooter flexDirection={"column"} alignItems={"flex-end"} gap={"10px"}>
            <Button variant={"ghost"} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={deleteChat} variant={"ghost"} colorScheme="red" ml={3}>
              {`Delete for me and ${reciver.username}`}
            </Button>
            <Button onClick={deleteChat} variant={"ghost"} colorScheme="red" ml={3}>
              Delete just for me
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
