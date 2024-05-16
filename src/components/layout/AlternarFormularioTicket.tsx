import { useState } from "react";
import cn from "@/cn";
import FormularioTicket from "../formularios/ticket";

const AlternarFormularioTicket = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  return (
    
    < div
      
      className = {cn("flex  flex-col w-full top-0  transition-all bg-white z-40", {
        "fixed pt-topbar md:pt-0 md:sticky h-dvh md:h-auto  md:top-topbar": mostrarFormulario,
        "sticky top-topbar": !mostrarFormulario
      })}>

      <div onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className={cn("text-center  p-4 font-bold cursor-pointer select-none",{
          "bg-violet-700 hover:bg-violet-500 text-white": !mostrarFormulario,
          "bg-slate-200 hover:bg-slate-300 text-violet-700": mostrarFormulario
        })}>Si tienes problemas, ¡Mándanos un ticket!</div>


      <div className={cn("bg-white overflow-y-auto grow", { "opacity-0 hidden": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
        <FormularioTicket closeOnSubmit={() => setMostrarFormulario(false)}/>
      </div>
    </div >
  );
}
 
export default AlternarFormularioTicket;