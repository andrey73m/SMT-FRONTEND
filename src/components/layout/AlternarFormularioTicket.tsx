import { useState } from "react";
import cn from "@/cn";

interface AlternarFormularioProps extends React.PropsWithChildren{
  texto: string;
  className?: string
}

const AlternarFormulario = ({ texto, children, className }: AlternarFormularioProps) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  return (
    
    < div
      
      className = {cn("flex  flex-col w-full top-0  transition-all bg-white", {
        "fixed pt-topbar md:pt-0 md:sticky h-dvh md:h-auto  md:top-topbar": mostrarFormulario,
        "sticky top-topbar": !mostrarFormulario,
        "z-50": mostrarFormulario
      }, className)}>

      <div onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className={cn("text-center  p-4 font-bold cursor-pointer select-none",{
          "bg-violet-700 hover:bg-violet-500 text-white": !mostrarFormulario,
          "bg-slate-200 hover:bg-slate-300 text-violet-700": mostrarFormulario
        })}>{texto}</div>


      <div className={cn("bg-white overflow-y-auto grow", { "opacity-0 hidden": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
        {children}
      </div>
    </div >
  );
}
 
export default AlternarFormulario;