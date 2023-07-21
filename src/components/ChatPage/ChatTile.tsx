import useUserStore from "@/store/userStore"
import { ChatTileType } from "@/types/chat"
import { Avatar } from "@chakra-ui/react"

// либо говно без типов но зато подходит
//@ts-ignore
import dateFomrat from "dateformat" 

export default function ChatTile({ photoURL, username, sentAt, sentBy, message, chatID }: ChatTileType) {
  const user = useUserStore(state => state.user)
  return (
    <div className="px-3 py-3 rounded-3xl flex justify-between cursor-pointer hover:bg-surface">
      <Avatar name={username} size="lg" src={photoURL ?? undefined} />
      <div className=" mx-2 flex-auto">
        <h1 className="text-white font-medium">{username}</h1>
        <p className="line-clamp-2 break-all text-sm text-light">
          {sentBy.userID === user.userID ? (
            message
          ) : (
            <>
              <span className="text-white font-semibold ">{sentBy.username}: </span>
              <span>{message}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col text-sm items-end">
        <h1 className={"text-sm text-light"}>{dateFomrat(new Date(sentAt.toDate()), "HH:HH")}</h1>
        {/* <MessageCount count={messageCount}/> */}
      </div>
    </div>
  )
}

function MessageCount({ count }: { count: number }) {
  return (
    <div className="bg-primary inline my-1 rounded-full w-7 h-7 flex items-center justify-center">
      <span className="text-white font-medium">{count}</span>
    </div>
  )
}
