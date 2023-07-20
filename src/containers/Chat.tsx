import { Spinner } from "@chakra-ui/react"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore"
import { Message } from "@/types/chat"
import { db } from "@/firebase/config"
import useUserStore, { User } from "@/store/userStore"

// либо говно без типов но зато подходит
//@ts-ignore
import dateFormat from "dateformat"
import SearchTab from "@/components/ChatPage/SearchTab"
import UserChatInfo from "@/components/ChatPage/UserChatInfo"
import MessagesList from "@/components/ChatPage/MessagesList"
import ChatInput from "@/components/ChatPage/ChatInput"

export default function Chat() {
  const location = useLocation()
  const messagesRef = useRef<HTMLDivElement>()
  const user = useUserStore((state) => state.user)
  const { chatID } = useParams()

  const [reciver, setChat] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchBar, setSearchBar] = useState(false)

  async function getReciverInfo() {
    try {
      await getDoc(doc(db, "users", chatID!)).then((doc) => {
        if (doc.exists()) {
          const data = doc.data() as User
          setChat(data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getMessages() {
    try {
      const chatRef = collection(db, "chats", user.userID, "message", chatID!, "messages")
      onSnapshot(chatRef, (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => doc.data()) as Message[]
          const sorted = data.sort((message, message2) => message.sentAt.seconds - message2.sentAt.seconds)
          setMessages(sorted)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(
    function () {
      const wait = async () => {
        await Promise.all([getReciverInfo(), getMessages()])
        setIsLoading(false)
      }
      wait()
      return () => {
        setIsLoading(true), setSearchBar(false)
      }
    },
    [location.pathname]
  )

  return (
    <div className={"grid " + (isSearchBar ? "grid-cols-[1fr,0.5fr]" : "grid-cols-[1fr]")}>
      {isLoading ? (
        <div className="h-screen">
          <div className="screen-center bg-background">
            <Spinner size={"xl"} />
          </div>
        </div>
      ) : (
        <div
          className={"flex flex-col h-screen bg-background " + (isSearchBar ? "rounded-tr-3xl rounded-br-3xl" : null)}
        >
          <div className="flex">
            {reciver ? (
              <UserChatInfo avatar={reciver?.photoURL} name={reciver.username} searchEvent={() => setSearchBar(true)} />
            ) : null}
          </div>
          <div className="flex flex-col overflow-auto h-full">
            <div className="flex-auto px-6 max-w-4xl m-auto w-full">
              <MessagesList ref={messagesRef} messages={messages} reciver={reciver} />
            </div>
          </div>
          <div>
            <ChatInput messagesRef={messagesRef} reciver={reciver} />
          </div>
        </div>
      )}
      <div className={isSearchBar ? "" : "translate-x-full hidden"}>
        <SearchTab closeSearchBar={() => setSearchBar(false)} />
      </div>
    </div>
  )
}
