import { Button } from '@chakra-ui/react';
import { HiCog } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import SearchBar from './SearchBar';
import ChatTile from '../ChatPage/ChatTile';
import ChatTiles from '../../data/chatTiles.json';

export default function SideBar() {
  const [chats, setChats] = useState(ChatTiles);
  const location = useLocation();

  function searchForChat(e: ChangeEvent<HTMLInputElement>) {
    setChats((chats) =>
      chats.filter((chat) =>
        chat.userName.toLowerCase().includes(e.target.value)
      )
    );

    if (e.target.value.length < 1) setChats(ChatTiles);
  }

  return (
    <div className="flex w-full flex-col h-full mr-2 overflow-auto bg-background">
      <div className="px-4 pt-4">
        <div className="my-4 px-4 flex items-center gap-2">
          <Button
            h={'56px'}
            w={'56px'}
            background={'primary.400'}
            rounded={'3xl'}
          >
            <div className="text-3xl text-white">
              <HiCog />
            </div>
          </Button>
          <div className="flex-auto">
            {SearchBar({
              hintText: 'Search for dialog',
              onSearch: searchForChat
            })}
          </div>
        </div>
      </div>
      <div className="mx-3">
        {chats.map((chat, idx) => (
          <Link
            key={idx}
            replace={location.pathname !== '/'}
            to={`/` + chat.id.toString()}
          >
            <ChatTile
              userName={chat.userName}
              avatarLink={chat.avatarLink}
              messageCount={chat.messageCount}
              messageTime={chat.messageTime}
              lastMessage={chat.lastMessage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
