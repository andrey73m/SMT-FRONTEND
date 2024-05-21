import { useState } from "react";
import cn from "@/cn";

export interface AlternarFormularioProps{
  texto: string;
  className?: string
  claseMostrar?: string;
  Formulario: React.FC<{
    afterSubmit?: () => void
  }>
}

const AlternarFormulario = ({ texto, className, claseMostrar, Formulario }: AlternarFormularioProps) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  let clasesMostrar = {
    " md:pt-0 h-dvh md:h-auto": mostrarFormulario,
    "sticky top-topbar": !mostrarFormulario
  }

  if (claseMostrar)
    clasesMostrar = { ...clasesMostrar, [claseMostrar]: mostrarFormulario, }
  
  return (
    
    < div
      
      className = {cn("flex  flex-col w-full top-0  transition-all bg-white", clasesMostrar, className)}>

      <div onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className={cn("text-center  p-4 font-bold cursor-pointer select-none",{
          "bg-violet-700 hover:bg-violet-500 text-white": !mostrarFormulario,
          "bg-slate-200 hover:bg-slate-300 text-violet-700": mostrarFormulario
        })}>{texto}</div>


      <div className={cn("bg-white overflow-y-auto grow", { "opacity-0 hidden": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
        <Formulario afterSubmit={() => setMostrarFormulario(false)} />
      </div>
    </div >
  );
}
 
export default AlternarFormulario;