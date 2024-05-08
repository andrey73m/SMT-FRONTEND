import { forwardRef, useEffect } from "react"
import { EditorTexto } from "../UI"
import { useFormContext } from "react-hook-form"
import ReactQuill from "react-quill"

interface Props extends ReactQuill.ReactQuillProps{
  name: string;
}

const CampoFormateado = forwardRef((props: Props) => {
  const { setValue, watch } = useFormContext()

  const onEditorChange = (state: string) => {
    if (props.name)
      setValue(props.name, state)
  }
  const contenido = watch(props.name)

  return(
    <EditorTexto
      onChange={onEditorChange}
      value={contenido}
      {...props}
    />
  )
})


CampoFormateado.displayName = "CampoFormateado"

export default CampoFormateado;