import { Button } from "@chakra-ui/react"
import { HiArrowSmLeft, HiCog } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { MouseEventHandler, useEffect, useState } from "react"

import SearchBar from "@/components/SideBar/SearchBar"
import ChatTile from "@/components/ChatPage/ChatTile"
import { db } from "@/firebase/config"

import SideBarSelect from "./SideBarSelect"
import useUserStore from "@/store/userStore"
import UserTile, { UserTileProps } from "./UserTile"
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { ChatTileType } from "@/types/chat"

export default function SideBar() {
  const user = useUserStore((state) => state.user)

  const [isSearch, setIsSearch] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [chats, setChats] = useState<ChatTileType[] | null>(null)
  const [searchResult, setSearchResult] = useState<UserTileProps[] | null>(null)

  async function getUserChats() {
    try {
      const chatQuery = query(collection(db, "chats", user.userID, "chat"))
      onSnapshot(chatQuery, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data()) as ChatTileType[]
        if (!snapshot.empty) {
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
                <div className="text-3xl text-white">
                  <HiCog />
                </div>
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
          <SearchList onClickTile={toggleSearchBar} users={searchResult} />
        ) : chats ? (
          <ChatList chats={chats} />
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

function ChatList({ chats }: { chats: ChatTileType[] }) {
  return (
    <div className="mx-3">
      {chats.map((chat, idx) => (
        <Link key={idx} replace={location.pathname !== "/"} to={`/` + chat.chatID}>
          <ChatTile
            photoURL={chat.photoURL}
            username={chat.username}
            chatID=""
            message={chat.message}
            sentAt={chat.sentAt}
            sentBy={chat.sentBy}
          />
        </Link>
      ))}
    </div>
  )
}

function SearchList({
  users,
  onClickTile,
}: {
  users: UserTileProps[] | null
  onClickTile: MouseEventHandler<HTMLAnchorElement>
}) {
  const location = useLocation()
  return (
    <>
      {users ? (
        <div>
          {users.map((user, idx) => {
            return (
              <Link key={idx} onClick={onClickTile} replace={location.pathname !== "/"} to={"/" + user.userID}>
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
