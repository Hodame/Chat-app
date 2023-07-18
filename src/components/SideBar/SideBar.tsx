import { Button } from "@chakra-ui/react"
import { HiCog } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import SearchBar from "@/components/SideBar/SearchBar"
import ChatTile from "@/components/ChatPage/ChatTile"
import SideBarSelect from "./SideBarSelect"
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database"
import { db } from "@/firebase/config"
import useUserStore from "@/store/userStore"
import UserTile from "./UserTile"

export default function SideBar() {
  const user = useUserStore((state) => state.user)

  const [isSearch, setIsSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [chats, setChats] = useState<ChatTile[] | null>(null)

  async function getUserChats() {
    try {
      const chatQuery = query(ref(db, "chats"), orderByChild("members"), equalTo(user.userID))
      await onValue(chatQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as ChatTile[]
          setChats(data)
        }
      })
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {

  }, [searchWord])

  useEffect(() => {
    getUserChats()
  }, [])

  return (
    <div className="flex w-full flex-col h-full mr-2 overflow-auto bg-background">
      <div className="px-4 pt-4">
        <div className="my-4 px-4 flex items-center gap-2">
          <SideBarSelect
            button={
              <Button h={"56px"} w={"56px"} background={"primary.400"} rounded={"3xl"}>
                <div className="text-3xl text-white">
                  <HiCog />
                </div>
              </Button>
            }
          />
          <div className="flex-auto">
            <SearchBar onSearch={(e) => setSearchWord(e.target.value)} hintText="Search for dialog" />
          </div>
        </div>
        {searchWord}
        {isSearch ? (
          <SearchList />
        ) : user.chats ? (
          chats ? (
            <ChatList chats={chats} />
          ) : (
            <>
              <div className="h-full flex items-center justify-center">
                <h1 className="font-semibold">Somethins went wrong...</h1>
              </div>
            </>
          )
        ) : (
          <>
            <div className="h-full flex items-center justify-center">
              <h1 className="font-semibold">Dont have chats? Find someone and start chating!</h1>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

type ChatListProps = {
  chats: ChatTile[]
}

function ChatList({ chats }: ChatListProps) {
  return (
    <div className="mx-3">
      {chats.map((chat, idx) => (
        <Link key={idx} replace={location.pathname !== "/"} to={`/` + chat.chatID}>
          <ChatTile
            username={chat.username}
            photoURL={chat.photoURL}
            messageCount={chat.messageCount}
            messageTime={chat.messageTime}
            lastMessage={chat.lastMessage}
            chatID={""}
          />
        </Link>
      ))}
    </div>
  )
}

function SearchList() {
  return (
    <div>
      <UserTile lastOnline={"December 17, 1995 03:24:00"} photoURL="bebra" username="bibra" />
    </div>
  )
}
