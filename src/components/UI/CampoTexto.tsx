import { forwardRef, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

const CampoTexto = forwardRef<HTMLInputElement, Props>(({ className,...props }: Props, ref) => {

  return (
    <input ref={ref} className={`w-full m-4 border-b-2 bg-transparent outline-none text-white border-violet-800 focus:border-violet-600 p-1 ${className}`} {...props}/>
  )
})

CampoTexto.displayName = "CampoTexto"
export default CampoTexto;