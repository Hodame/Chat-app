import { Avatar, Divider, IconButton } from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";
import SearchBar from "./SearchBar";
import ChatTile from "./ChatTile";
import ChatTiles from "../data/chatTiles.json";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export default function SideBar() {
  const [chats, setChats] = useState(ChatTiles);

  function searchForChat(e: ChangeEvent<HTMLInputElement>) {
    
    setChats(chats => chats.filter(chat => chat.userName.toLowerCase().includes(e.target.value)))

    if(e.target.value.length < 1) setChats(ChatTiles)
  }

  return (
    <div className="flex flex-col h-full border-r-2 overflow-auto">
      <div className="px-4 pt-4">
        <div className="">{User()}</div>
        <div className="my-4">
          {SearchBar({ hintText: "Search for dialog", onSearch: searchForChat})}
        </div>
      </div>
      <div>
        {chats.map((chat) => (
          <>
            <Link to={`/` + chat.id}>
              <ChatTile
                userName={chat.userName}
                avatarLink={chat.avatarLink}
                messageCount={chat.messageCount}
                messageTime={chat.messageTime}
                lastMessage={chat.lastMessage}
              />
              <Divider />
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Avatar
          name="Hodame"
          src="https://i.pinimg.com/originals/04/cb/c2/04cbc2e3482a3865485305d3a4643610.jpg"
        />
        <div>
          <h1 className="text-primary font-bold">Hodame</h1>
          <p className="text-gray-500 font-medium">hodame04@gmail.com</p>
        </div>
      </div>
      <IconButton
        variant="outline"
        aria-label="edit profile"
        icon={<HiPencil />}
      />

    </div>
  );
}
