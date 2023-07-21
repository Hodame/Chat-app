import { Message } from "@/types/chat"
import useUserStore, { User } from "@/store/userStore"

import MessageLine from "./MessageLine"

//@ts-ignore
import dateFormat from "dateformat"
import { forwardRef, useImperativeHandle, useRef } from "react"

type MessagesListProps = {
  messages: Message[] | null
  reciver: User | null
}

const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(({ messages, reciver }, ref) => {
  const messsageRef = useRef<HTMLDivElement | null>(null)
  const user = useUserStore((state) => state.user)

  useImperativeHandle(ref, () => messsageRef.current!)

  return (
    <>
      {messages ? (
        <div ref={messsageRef}>
          {messages.map((message, idx) => (
            <MessageLine
              key={idx}
              message={message.message}
              userName={message.sentBy.username}
              fromUser={user.userID === message.sentBy.userID}
              timeSend={dateFormat(new Date(message.sentAt.toDate()), "HH:MM")}
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
