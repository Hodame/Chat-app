import {
  Avatar,
  AvatarBadge,
  useOutsideClick,
  Button,
  Spinner,
} from "@chakra-ui/react";
import chats from "../data/chatTiles.json";
import { useLocation, useParams } from "react-router-dom";
import { HiPaperAirplane, HiPaperClip } from "react-icons/hi";
import { HiDotsHorizontal, HiSearch } from "react-icons/hi";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageLine from "../components/ChatPage/MessageLine";
import SeachTab from "../components/ChatPage/SearchTab";

export default function Chat() {
  const { chatID } = useParams();
  const chat = chats.find(
    (chat) => chat.id === (() => (chatID ? parseInt(chatID) : 0))()
  );

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<
    { body: string; user: { username: string }; fromUser?: boolean }[]
  >([{ body: "", user: { username: "" } }]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchBar, setSearchBar] = useState(false);

  async function fetchMessages() {
    const response = await fetch("https://dummyjson.com/comments");
    const data: { comments: { body: string; user: { username: string } }[] } =
      await response.json();

    setMessages(data.comments);
    setIsLoading(false);
    setTimeout(() => {
      messagesRef.current?.scrollIntoView({
        block: "end",
        behavior: "instant",
      });
    }, 1);
  }

  useEffect(
    function () {
      fetchMessages();
      return () => {
        setIsLoading(true),
        setSearchBar(false)
      };
    },
    [location.pathname]
  );

  function sendMessage() {
    setMessages([
      ...messages,
      {
        body: 'ff',
        user: { username: "hodame" },
        fromUser: true,
      },
    ]);
    setTimeout(() => {
      messagesRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 1);
  }

  return (
    <div
      className={
        "grid " + (isSearchBar ? "grid-cols-[1fr,0.5fr]" : "grid-cols-[1fr]")
      }
    >
      <div
        className={
          "flex flex-col h-screen bg-background " +
          (isSearchBar ? "rounded-tr-3xl rounded-br-3xl" : null)
        }
      >
        <div className="flex">
          <UserChatInfo
            avatar={chat?.avatarLink}
            name={chat?.userName}
            searchEvent={() => setSearchBar(true)}
          />
        </div>
        <div className="flex flex-col overflow-auto h-full">
          <div className="flex-auto px-6 max-w-4xl m-auto w-full">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Spinner size={"xl"} />
              </div>
            ) : (
              <div ref={messagesRef}>
                {messages.map((message, idx) => (
                  <MessageLine
                    key={idx}
                    message={message.body}
                    userName={message.user.username}
                    fromUser={message.fromUser}
                    corner={messages.length == idx + 1}
                    timeSend="10:30pm"
                  />
                ))}
                <span></span>
              </div>
            )}
          </div>
        </div>
        <div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
      <div className={isSearchBar ? "" : "translate-x-full hidden"}>
        <SeachTab closeSearchBar={() => setSearchBar(false)} />
      </div>
    </div>
  );
}

function UserChatInfo({
  avatar,
  name,
  searchEvent,
}: {
  avatar?: string;
  name?: string;
  searchEvent: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="flex items-center p-3 justify-between w-full">
      <div className="flex items-center">
        <Avatar className="mr-3" name={name} src={avatar}>
          <AvatarBadge boxSize="1.0em" bg="green.500" />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-primary">Online</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <Button rounded={"3xl"} onClick={searchEvent} variant="ghost">
            <HiSearch />
          </Button>
        </div>
        <div>
          <Button rounded={"3xl"} variant="ghost">
            <HiDotsHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatInput({
  sendMessage,
}: {
  sendMessage: MouseEventHandler<HTMLButtonElement>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  function resize(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = e.target.scrollHeight + "px";
  }
  return (
    <div className=" flex items-end gap-2 p-5 max-w-4xl m-auto w-full">
      <div
        className={
          "relative flex items-end rounded-3xl hover:bg-surface ease-linear w-full focus:bg-surface"
        }
      >
        <div className="absolute h-[42px] left-6 top[50%] -translate-x-[50%]">
          <Button h={"inherit"} rounded={"3xl"} variant={"ghost"}>
            <HiPaperClip />
          </Button>
        </div>
        <textarea
          ref={textareaRef}
          onChange={resize}
          rows={1}
          placeholder="Write a message..."
          className="bg-transparent py-3 px-12 w-full rounded-3xl max-h-72 resize-none"
        />
      </div>
      <div className="rotate-90 h-full">
        <Button
          onClick={sendMessage}
          h={12}
          w={"100%"}
          rounded={"3xl"}
          variant={"solid"}
        >
          <HiPaperAirplane />
        </Button>
      </div>
    </div>
  );
}
