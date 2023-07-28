import { ReciverContext } from "@/context/ReciverContext"
import { db } from "@/firebase/config"
import useUserStore from "@/store/userStore"
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
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, writeBatch } from "firebase/firestore"
import { useContext, useRef, useState } from "react"
import { HiFlag, HiTrash } from "react-icons/hi"
import { IoMdNotificationsOff } from "react-icons/io"
import { useNavigate } from "react-router-dom"
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
        <DeleteDialog />
      </MenuList>
    </Menu>
  )
}

function DeleteDialog() {
  const navigate = useNavigate()
  const reciver = useContext(ReciverContext)
  const user = useUserStore((state) => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  async function deleteChatForUser() {
    setIsLoading(true)
    await deleteDoc(doc(db, "chats", user.userID, "chat", reciver.userID))
    await getDocs(collection(db, "chats", user.userID, "message", reciver.userID, "messages")).then((docs) => {
      if (!docs.empty) {
        const chunks = []

        for (let i = 0; i < docs.docs.length; i += 499) {
          chunks.push(docs.docs.slice(i, i + 499))
        }

        chunks.forEach((chunk) => {
          chunk.map((doc) => writeBatch(db).delete(doc.ref).commit())
        })
      }
    })
    setIsLoading(false)
    onClose()
    navigate("/")
  }

  async function deleteChatForUsers() {
    setIsLoading(true)
    await deleteChatForUser()
    await deleteDoc(doc(db, "chats", reciver.userID, "chat", user.userID))
    await getDocs(collection(db, "chats", reciver.userID, "message", user.userID, "messages")).then((docs) => {
      if (!docs.empty) {
        const chunks = []

        for (let i = 0; i < docs.docs.length; i += 499) {
          chunks.push(docs.docs.slice(i, i + 499))
        }

        chunks.forEach((chunk) => {
          chunk.map((doc) => writeBatch(db).delete(doc.ref).commit())
        })
      }
    })
    setIsLoading(false)
    onClose()
    navigate("/")
  }
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

        <AlertDialogContent backgroundColor={"surface"}>
          <AlertDialogHeader>Delete this chat?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to delete this chat?</AlertDialogBody>
          <AlertDialogFooter flexDirection={"column"} alignItems={"flex-end"} gap={"10px"}>
            <Button variant={"ghost"} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={deleteChatForUsers} variant={"ghost"} colorScheme="red" ml={3}>
              {`Delete for me and ${reciver.username}`}
            </Button>
            <Button isLoading={isLoading} onClick={deleteChatForUser} variant={"ghost"} colorScheme="red" ml={3}>
              Delete just for me
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
