import { MouseEventHandler, useContext } from "react"
import { HiDotsHorizontal, HiSearch } from "react-icons/hi"
import { Avatar, AvatarBadge, Button } from "@chakra-ui/react"
import { ReciverContext } from "@/context/ReciverContext"

import ChatSelectMenu from "./ChatSelectMenu"
import TimeAgo from "timeago-react"

type UserChatInfoProps = {
  avatar?: string | null
  name?: string
  searchEvent: MouseEventHandler<HTMLButtonElement>
}

export default function UserChatInfo({ avatar, name, searchEvent }: UserChatInfoProps) {
  const reciver = useContext(ReciverContext)
  return (
    <div className="flex items-center p-3 justify-between w-full">
      <div className="flex items-center">
        <Avatar className="mr-3" name={name} src={avatar ?? undefined}>
          {reciver.isOnline ? <AvatarBadge boxSize="1.0em" bg="green.500" /> : null}
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          {!reciver.isOnline && reciver.lastOnline ? (
            <div className="text-light font-bold text-sm">
              Last seen <TimeAgo opts={{ minInterval: 1 }} datetime={reciver.lastOnline.toDate()} />
            </div>
          ) : null}
          {reciver.isOnline ? <p className="text-primary">Online</p> : null}
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <Button rounded={"3xl"} onClick={searchEvent} variant="ghost">
            <HiSearch />
          </Button>
        </div>
        <div>
          <ChatSelectMenu button={<HiDotsHorizontal />} />
        </div>
      </div>
    </div>
  )
}
