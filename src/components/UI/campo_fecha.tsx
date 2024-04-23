import { useRef } from "react";
import CampoTexto from "./campo";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const CampoFecha = (props:Props) => {

  const fecha = useRef<HTMLInputElement>(null);

  const onFocusFecha = () => {
    if (!!fecha && !!fecha.current) fecha.current.type = "date";
  }

  const onBlurFecha = () => {
    if (!!fecha && !!fecha.current) fecha.current.type = "text";
  }

  return (
    <CampoTexto  {...props} ref={fecha} onFocus={onFocusFecha} onBlur={onBlurFecha} onChange={props.onChange} />
  )
}

export default CampoFecha;