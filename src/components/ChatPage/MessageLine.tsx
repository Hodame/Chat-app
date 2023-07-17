type MessageLineProps = {
  message: string
  timeSend: string
  userName?: string
  fromUser?: boolean
}

export default function MessageLine({ message, timeSend, fromUser = false, userName }: MessageLineProps) {
  return (
    <div className={"flex " + (fromUser ? "justify-end" : "")}>
      <div className="max-w-3xl relative animate-message-appear">
        <div
          className={
            "inline-flex items-end rounded-xl p-2 my-1 overflow-hidden z-10 relative " +
            (fromUser ? "bg-primary" : "bg-surface")
          }
        >
          <div>
            {userName && !fromUser ? <div className="font-semibold text-sm mb-2">{userName}</div> : null}
            <div className="flex items-end">
              <p className=" text-white font-medium mr-3 break-words">{message}</p>
              <span className={"text-xs font-semibold " + (fromUser ? "text-gray-200" : "text-light")}>{timeSend}</span>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  )
}
