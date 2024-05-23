import { Outlet } from "react-router-dom";
import { useState } from "react";

import cn from "@/cn";
import { useNavigate } from "react-router-dom";
import LogoPrincipal from "../icons/LogoPrincipal";
import { useParams } from "react-router-dom";
import { useQueryConversaciones, useValidarOnline } from "@/hooks";
import { DataConversacion } from "@/models/Conversacion";
import PuntoIndicador from "../layout/PuntoIndicador";

 
interface PreConversacionProps{
  conversacion: DataConversacion
}
const PreConversacion = ({ conversacion }: PreConversacionProps) => {
  const { ticket } = conversacion
  const navigate = useNavigate()
  const { idticket } = useParams();
  const usuarioChat = ticket.usuario || ticket?.empleado;
  if (ticket.empleado) console.log("empleado", usuarioChat, ticket.empleado)
  const { isOnline: onlineToChat } = useValidarOnline(usuarioChat?.idusuario)
  return (
    <>
    
      {
        usuarioChat &&
      <div onClick={() => { if (idticket !== ticket.idticket) navigate(`/chats/${conversacion.idticket}`) }} className={cn("flex flex-col w-full bg-slate-100 hover:bg-slate-300 p-6 border-b-2 z-0 cursor-pointer",{
        "bg-slate-300": idticket === ticket.idticket
      })}>
        <h5 className="font-bold">{ticket.asunto}</h5>
        <p className={cn("text-sm text-slate-400", {
          "text-slate-500": idticket === ticket.idticket
        })}>{
            ticket.tipo_servicio ? ticket.tipo_servicio : "El ticket no ha sido clasificado en un tipo de servicio"
          }</p>
        {
          usuarioChat &&
        <div className="flex gap-x-2 items-center">
          <PuntoIndicador className={cn("bg-green-300", {
            "bg-gray-200": !onlineToChat
          })} />
          <p className={cn("text-slate-400", {
            "text-slate-500": idticket === ticket.idticket
          })}>{usuarioChat.nombres} {usuarioChat.apellidos}</p>
        </div>
        }
      </div>
      }
    </>
  )
}

const PaginaConversaciones = () => {
  const [abierto] = useState(true)
  const { idticket } = useParams();
  
  
  const { data:conversaciones } = useQueryConversaciones()

  return (
    <div className="sm:flex min-h-0 h-[calc(100svh-3rem)] w-full">
      <div className={cn("transicion-all sm:w-72 lg:w-96 h-full overflow-y-auto border-r-2 bg-slate-200",{
        "absolute -left-full": !abierto,
        "hidden sm:block": !!idticket
      })}>
        <h4 className="text-2xl font-bold p-2 text-center bg-white shadow-lg z-50 ">Tus Chats</h4>
        {
          conversaciones && conversaciones.length > 0 ?
            conversaciones.map(c =>
              <PreConversacion key={c.idconversacion} conversacion={c}/>
            )
            :
            <p className="text-gray-200 text-center p-2">No tienes chats</p>
        }
      </div>
      <div className={cn("sm:grow sm:block h-full relative",{
        "hidden": !idticket
      })}>
        {

        }
        <div className={cn("flex absolute justify-center items-center w-full h-full -z-40 ")}>
          <div className="h-96">

            <LogoPrincipal fill="#eeeeee"/>
          </div>
        </div>
        <Outlet key={idticket}/>
      </div>
    </div>
  );
}
 
export default PaginaConversaciones;