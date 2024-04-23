import { forwardRef, useState } from "react";
import CampoTexto from "./CampoTexto";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const CampoFecha = forwardRef<HTMLInputElement, Props>((props:Props, fecha) => {

  const [type, setType] = useState("");

  const onFocusFecha = () => {
    setType("date")
  }

  const onBlurFecha = () => {
    setType("text")
  }

  return (
    <CampoTexto  {...props} ref={fecha} onFocus={onFocusFecha} onBlur={onBlurFecha} type={type}/>
  )
})

CampoFecha.displayName = "CampoFecha";

export default CampoFecha;