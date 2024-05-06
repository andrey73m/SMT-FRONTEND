
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface Props extends ReactQuill.ReactQuillProps{}

const EditorTexto = ({ className,...props }:Props) => {
  return (
    <ReactQuill
      {...props}
      className={`w-full h-48 ${className}`}
      theme="snow"
    />
  )
}

EditorTexto.displayName = "EditorTexto"

export default EditorTexto;