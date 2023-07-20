import { ChangeEvent, ChangeEventHandler, KeyboardEventHandler, forwardRef, useImperativeHandle, useRef } from "react"

type ResizeTextAreaProps = {
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onKeyPress: KeyboardEventHandler<HTMLTextAreaElement>
}

const ResizeTextArea = forwardRef(({ placeholder, value, onChange, onKeyPress }: ResizeTextAreaProps, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function resize(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!textareaRef.current) return
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = e.target.scrollHeight + "px"
  }

  useImperativeHandle(ref, () => ({
    setAuto() {
      if (!textareaRef.current) return
      textareaRef.current.style.height = "auto"
    }
  }))

  return (
    <>
      <textarea
        ref={textareaRef}
        onKeyDown={(e) => onKeyPress(e)}
        value={value}
        onChange={(e) => (resize(e), onChange(e))}
        rows={1}
        placeholder={placeholder}
        className="bg-transparent py-3 px-12 w-full rounded-3xl max-h-72 resize-none"
      />
    </>
  )
})

export default ResizeTextArea
