import { Button } from "@chakra-ui/react"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { KeyboardEvent, useRef, useState } from "react"
import { HiPaperAirplane, HiPaperClip } from "react-icons/hi"
import { db } from "@/firebase/config"

import useUserStore, { User } from "@/store/userStore"
import ResizeTextArea from "../UI/ResizeTextArea"

type ChatInputProps = {
  reciver: User | null
}

export default function ChatInput({ reciver }: ChatInputProps) {
  const user = useUserStore((state) => state.user)
  const textareaRef = useRef<{ setAuto: () => void }>()

  const [message, setMessage] = useState("")

  async function sendMessage() {
    if (!reciver) return
    if (!message.trim().length) return

    try {
      const userRef = collection(db, "chats", user.userID, "message", reciver.userID, "messages")
      const reviverRef = collection(db, "chats", reciver.userID, "message", user.userID, "messages")

      textareaRef.current?.setAuto()
      setMessage("")

      await addDoc(userRef, {
        sentBy: {
          username: user.username,
          photoURl: user.photoURL,
          userID: user.userID,
        },
        sentAt: new Date(),
        message: message,
      })
      await addDoc(reviverRef, {
        sentBy: {
          username: user.username,
          photoURl: user.photoURL,
          userID: user.userID,
        },
        sentAt: new Date(),
        message: message,
      })

      const updateRef = doc(db, "chats", user.userID, "chat", reciver.userID)
      const updateReciverRef = doc(db, "chats", reciver.userID, "chat", user.userID)

      await setDoc(updateReciverRef, {
        photoURL: user.photoURL,
        username: user.username,
        chatID: user.userID,
        message: message,
        sentAt: new Date(),
        sentBy: {
          username: user.username,
          userID: user.userID,
        },
      })

      await setDoc(updateRef, {
        photoURL: reciver.photoURL,
        username: reciver.username,
        chatID: reciver.userID,
        message: message,
        sentAt: new Date(),
        sentBy: {
          username: user.username,
          userID: user.userID,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  function keyBoardEvent(e: KeyboardEvent) {
    if (e.code === "Enter" && e.shiftKey) {
      setMessage(message + "\n")
    }
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex items-end gap-2 p-5 max-w-4xl m-auto w-full">
      <div className={"relative flex items-end rounded-3xl hover:bg-surface ease-linear w-full focus:bg-surface"}>
        <div className="absolute h-[42px] left-6 top[50%] -translate-x-[50%]">
          <Button h={"inherit"} rounded={"3xl"} variant={"ghost"}>
            <HiPaperClip />
          </Button>
        </div>
        <ResizeTextArea
          ref={textareaRef}
          value={message}
          onKeyPress={(e) => keyBoardEvent(e)}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
        />
      </div>
      <div className="rotate-90 h-full">
        <Button onClick={sendMessage} h={12} w={"100%"} rounded={"3xl"} variant={"solid"}>
          <HiPaperAirplane />
        </Button>
      </div>
    </div>
  )
}
