import TimeAgo from 'timeago-react';

import { Avatar } from "@chakra-ui/react"

export type UserTileProps = {
  photoURL: string
  username: string
  lastOnline: string
  userID?: string
}

export default function UserTile({ photoURL, username, lastOnline }: UserTileProps) {
  return (
    <div className="flex gap-3 items-center rounded-3xl p-3 hover:bg-surface">
      <Avatar size={'lg'} name={username} src={photoURL}/>
      <div>
        <h1 className="text-xl font-semibold">{username}</h1>
        <TimeAgo className="text-light text-sm font-medium" live datetime={lastOnline}/>
      </div>
    </div>
  )
}
