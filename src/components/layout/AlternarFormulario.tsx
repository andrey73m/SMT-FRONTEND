import { useState } from "react";
import cn from "@/cn";
import { BotonProps } from "../UI/Botones";
import { FormularioProps } from "../formularios/PropsFormulario";

export interface AlternarFormularioProps{
  texto: string;
  className?: string
  claseMostrar?: string;
  Formulario: React.FC<FormularioProps>
  Boton: React.FC<BotonProps>
}

const AlternarFormulario = ({ texto, className, claseMostrar, Formulario, Boton }: AlternarFormularioProps) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  let clasesMostrar = {
    "sticky top-topbar": !mostrarFormulario
  }

  if (claseMostrar)
    clasesMostrar = { ...clasesMostrar, [claseMostrar]: mostrarFormulario, }
  
  return (
    
    < div
      
      className = {cn("flex  flex-col w-full top-0  transition-all bg-white", className, clasesMostrar)}>

      <Boton onClick={() => setMostrarFormulario(!mostrarFormulario)}
        negar={mostrarFormulario}
        className={cn("text-center  p-4 font-bold cursor-pointer select-none rounded-none")}>{texto}</Boton>


      <div className={cn("bg-white overflow-y-auto grow", { "opacity-0 hidden": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
        <Formulario afterSubmit={() => setMostrarFormulario(false)} />
      </div>
    </div >
  );
}
 
export default AlternarFormulario;