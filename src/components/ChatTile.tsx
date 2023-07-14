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
    <div className="px-3 py-2 flex justify-between cursor-pointer hover:bg-light">
      <Avatar
        name={userName}
        size="lg"
        src={avatarLink}
      />
      <div className=" mx-2 flex-auto">
        <h1 className="text-primary font-bold">{userName}</h1>
        <p className="line-clamp-2 text-sm">
          {lastMessage}
        </p>
      </div>
      <div className="flex flex-col text-sm items-end">
        <h1 className="font-medium">{messageTime}</h1>
        {MessageCount({ count: messageCount })}
      </div>
    </div>
  );
}

function MessageCount({ count }: { count: number }) {
  return (
    <div className="bg-primary inline my-1 rounded-full w-6 h-6 flex items-center justify-center">
      <span className="text-light font-bold">{count}</span>
    </div>
  );
}
