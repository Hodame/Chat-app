import { Button } from "@chakra-ui/react"
import { HiArrowSmLeft, HiCog } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import SearchBar from "@/components/SideBar/SearchBar"
import ChatTile from "@/components/ChatPage/ChatTile"
import { db } from "@/firebase/config"

import SideBarSelect from "./SideBarSelect"
import useUserStore from "@/store/userStore"
import UserTile, { UserTileProps } from "./UserTile"
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"

export default function SideBar() {
  const user = useUserStore((state) => state.user)

  const [isSearch, setIsSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [chats, setChats] = useState<ChatTile[] | null>(null)
  const [searchResult, setSearchResult] = useState<UserTileProps[] | null>(null)

  async function getUserChats() {
    try {
      const chatQuery = query(collection(db, "chats"), where("members", "array-contains", user.userID))
      await onSnapshot(chatQuery, (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => doc.data()) as ChatTile[]
          setChats(data)
        }
      })
    } catch (error) {
      alert(error)
    }
  }

  const toggleSearchBar = () => (setIsSearch(false), setSearchWord(""))

  useEffect(() => {
    async function getSeachUsers() {
      try {
        const userQuery = query(collection(db, "users"), where("username", "==", searchWord))
        await getDocs(userQuery).then((result) => {
          const data = result.docs.map((doc) => doc.data()) as UserTileProps[]
          console.log(searchWord)
          if (!result.empty) {
            setSearchResult(data)
          }
        })
      } catch (error) {}
    }

    if (searchWord.length) {
      getSeachUsers()
    } else {
      setSearchResult(null)
    }
  }, [searchWord])

  useEffect(() => {
    getUserChats()
  }, [])

  return (
    <div className="flex w-full flex-col h-full mr-2 overflow-auto bg-background">
      <div className="px-4 pt-4">
        <div className="my-4 px-4 flex items-center gap-2">
          {isSearch ? (
            <div>
              <Button onClick={toggleSearchBar} h={"56px"} w={"56px"}>
                <div className="text-3xl text-white">
                  <HiArrowSmLeft />
                </div>
              </Button>
            </div>
          ) : (
            <SideBarSelect
              button={
                <Button h={"56px"} w={"56px"} rounded={"3xl"}>
                  <div className="text-3xl text-white">
                    <HiCog />
                  </div>
                </Button>
              }
            />
          )}
          <div className="flex-auto">
            <SearchBar
              value={searchWord}
              onFocus={() => setIsSearch(true)}
              onSearch={(e) => setSearchWord(e.target.value)}
              hintText="Search for dialog"
            />
          </div>
        </div>
        {isSearch ? (
          <SearchList users={searchResult} />
        ) : user.chats ? (
          chats ? (
            <ChatList chats={chats} />
          ) : (
            <>
              <div className="screen-center">
                <h1 className="font-semibold">Somethins went wrong...</h1>
              </div>
            </>
          )
        ) : (
          <>
            <div className="screen-center">
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

function SearchList({ users }: { users: UserTileProps[] | null }) {
  return (
    <>
      {users ? (
        <div>
          {users.map((user) => {
            return (
              <Link to={"/" + user.userID}>
                <UserTile lastOnline={"December 17, 1995 03:24:00"} photoURL={user.photoURL} username={user.username} />
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="screen-center">
          <p className="font-semibold">Sorry we couldn't find someone...</p>
        </div>
      )}
    </>
  )
}
