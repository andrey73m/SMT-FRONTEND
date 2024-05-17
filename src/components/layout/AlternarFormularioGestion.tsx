import { useEffect, useState } from "react";
import cn from "@/cn";
import FormularioGestionarTicket from "../formularios/gestionar_ticket";
import { BotonPositivo } from "../UI/Botones";
import { DataTicket } from "@/models";


interface AlternarProps{
  ticket: DataTicket;
  recienAceptado?: boolean;
}

const AlternarFormularioGestionarTicket = ({ ticket, recienAceptado }:AlternarProps) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(recienAceptado)
  useEffect(() => {

    if (!recienAceptado){
      setMostrarFormulario(false)
    }
  }, [recienAceptado, ticket])
  //TODO TOGGLE ELEMENT
  return (

    < div

      className={cn("flex grow  flex-col w-full top-0  transition-all bg-white z-40", {
        "md:pt-0 h-auto": mostrarFormulario,
        "": !mostrarFormulario
      })}>
      {
        !recienAceptado &&
        (
          <BotonPositivo negar={mostrarFormulario} onClick={() => setMostrarFormulario(!mostrarFormulario)}>{
            mostrarFormulario ?
              "Cerrar" : "Editar"
          }</BotonPositivo>
        )
      }


      <div className={cn("bg-white grow", { "opacity-0 hidden": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
        <FormularioGestionarTicket ticket={ticket} primera={recienAceptado}/>
      </div>
    </div >
  );
}

export default AlternarFormularioGestionarTicket;