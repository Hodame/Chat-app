import { Message } from "@/types/chat"
import useUserStore, { User } from "@/store/userStore"

import MessageLine from "./MessageLine"

//@ts-ignore
import dateFormat from "dateformat"
import { forwardRef } from "react"

type MessagesListProps = {
  messages: Message[] | null
  reciver: User | null
}

const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(({ messages, reciver }, ref) => {
  const user = useUserStore((state) => state.user)

  return (
    <>
      {messages ? (
        <div ref={ref}>
          {messages.map((message, idx) => (
            <MessageLine
              key={idx}
              message={message.message}
              userName={message.sentBy.username}
              fromUser={user.userID === message.sentBy.userID}
              timeSend={dateFormat(new Date(message.sentAt.seconds), "HH:MM")}
            />
          ))}
          <span></span>
        </div>
      ) : (
        <div className="screen-center">
          <h1 className="font-semibold">Say hello to {reciver ? reciver.username : "user???"}</h1>
        </div>
      )}
    </>
  )
})

export default MessagesList
