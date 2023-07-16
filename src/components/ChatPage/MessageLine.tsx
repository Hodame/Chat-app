type MessageLineProps = {
  message: string;
  timeSend: string;
  userName?: string;
  fromUser?: boolean;
  corner?: boolean;
};

export default function MessageLine({
  message,
  timeSend,
  fromUser = false,
  userName,
  corner,
}: MessageLineProps) {
  return (
    <div className={"flex " + (fromUser ? "justify-end" : "")}>
      <div className="max-w-3xl relative animate-message-appear">
        {/* {corner ? (
          <div
            className={
              "absolute bottom-1 w-9 h-5 z-0 " +
              (fromUser
                ? "bg-primary -right-2 rounded-tr-[9999px]"
                : "bg-surface -left-2 rounded-tl-[9999px]")
            }
          ></div>
        ) : null} */}
        <div
          className={
            "inline-flex items-end rounded-xl p-2 my-1 overflow-hidden z-10 relative " +
            (fromUser ? "bg-primary" : "bg-surface")
          }
        >
          <div>
            {userName && !fromUser ? (
              <div className="font-semibold text-sm mb-2">{userName}</div>
            ) : null}
            <div className="flex items-end">
              <p className=" text-white font-medium mr-3 break-words">
                {message}
              </p>
              <span
                className={
                  "text-xs font-semibold " +
                  (fromUser ? "text-gray-200" : "text-light")
                }
              >
                {timeSend}
              </span>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
