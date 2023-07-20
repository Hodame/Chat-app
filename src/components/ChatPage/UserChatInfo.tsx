import { MouseEventHandler } from "react"
import { HiDotsHorizontal, HiSearch } from "react-icons/hi"
import { Avatar, AvatarBadge, Button } from "@chakra-ui/react"

type UserChatInfoProps = {
  avatar?: string | null
  name?: string
  searchEvent: MouseEventHandler<HTMLButtonElement>
}

export default function UserChatInfo({ avatar, name, searchEvent }: UserChatInfoProps) {
  return (
    <div className="flex items-center p-3 justify-between w-full">
      <div className="flex items-center">
        <Avatar className="mr-3" name={name} src={avatar ?? undefined}>
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
  )
}