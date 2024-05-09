
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import cn from "@/cn"

interface Props extends ReactQuill.ReactQuillProps{}

const EditorTexto = ({ className,...props }:Props) => {
  return (
    <ReactQuill
      {...props}
      className={cn("w-full h-full",className)}
      theme={props.readOnly ? "bubble" : "snow"}
    />
  )
}

EditorTexto.displayName = "EditorTexto"

export default EditorTexto;