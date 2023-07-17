import { Avatar } from "@chakra-ui/react";

type ChatTileProps = {
  avatarLink: string;
  userName: string;
  lastMessage: string;
  messageTime: string;
  isRead?: boolean;
  messageCount: number
};

export default function ChatTile({ avatarLink, userName, lastMessage, messageTime, isRead, messageCount}: ChatTileProps) {
  return (
    <div className="px-3 py-3 rounded-3xl flex justify-between cursor-pointer hover:bg-surface">
      <Avatar
        name={userName}
        size="lg"
        src={avatarLink}
      />
      <div className=" mx-2 flex-auto">
        <h1 className="text-white font-medium">{userName}</h1>
        <p className="line-clamp-2 text-sm text-light">
          {lastMessage}
        </p>
      </div>
      <div className="flex flex-col text-sm items-end">
        <h1 className={"text-sm text-light"}>{messageTime}</h1>
        <MessageCount count={messageCount}/>
      </div>
    </div>
  );
}

function MessageCount({ count }: { count: number }) {
  return (
    <div className="bg-primary inline my-1 rounded-full w-7 h-7 flex items-center justify-center">
      <span className="text-white font-medium">{count}</span>
    </div>
  );
}
