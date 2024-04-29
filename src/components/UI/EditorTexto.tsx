import { forwardRef } from "react";
import { RefCallBack, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

interface Props extends ReactQuill.ReactQuillProps{}

const EditorTexto = (props:Props) => {
  return (
    <ReactQuill
      {...props}
      theme="snow"
    />
  )
}

EditorTexto.displayName = "EditorTexto"

export default EditorTexto;