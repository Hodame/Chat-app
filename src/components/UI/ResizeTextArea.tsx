import { ChangeEvent, useRef } from "react"

type ResizeTextAreaProps = {
  placeholder: string
}

export default function ResizeTextArea({ placeholder }: ResizeTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function resize(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!textareaRef.current) return
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = e.target.scrollHeight + "px"
  }
  
  return (
    <>
      <textarea
        ref={textareaRef}
        onChange={resize}
        onInput={() => console.log("bebra")}
        rows={1}
        placeholder={placeholder}
        className="bg-transparent py-3 px-12 w-full rounded-3xl max-h-72 resize-none"
      />
    </>
  )
}
