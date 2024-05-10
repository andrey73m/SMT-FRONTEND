
import ticketService from "@/services/ticketService";

import VisorTexto from "@/components/UI/VisorTexto";

import { VistaRol } from "@/components/wrappers"
import BotonNegativo from "@/components/UI/Botones/BotonNegativo";
import { DataTicket } from "@/models";
import cn from "@/cn";
import { SetStateAction, useRef } from "react";
import IconoFlecha from "@/components/icons/Flecha";
import BotonPositivo from "@/components/UI/Botones/BotonPositivo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSesion } from "@/hooks";
import { TextoClickable } from "@/components/UI";
import { useSearchParams } from "react-router-dom";




interface TicketProps{
  ticket: DataTicket,
  abierto?: boolean,
  // eslint-disable-next-line no-unused-vars
  setAbierto: React.Dispatch<SetStateAction<string>>
}
 


const Ticket = ({ ticket,abierto, setAbierto }: TicketProps) => {
  const { info } = useSesion()
  const queryClient = useQueryClient()
  const refTextoUsuario = useRef(null)
  const [_, setParams] = useSearchParams()
  const acceptMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.aceptarTicket(ticket.idticket),
    onSuccess: (updated) => {
      const data = queryClient.getQueryData<DataTicket[]>(["tickets"])
      queryClient.setQueryData(["tickets"], data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
    }
  })
  const handleAccept = async () => {
    if (ticket.idticket)
      acceptMutation.mutate()
  }
  const cerrarVentana = () => {
    setAbierto("")
  }
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      <div onClick={(e) => {!abierto && e.target !== refTextoUsuario.current && setAbierto(ticket.idticket)}}
        className={cn("bg-white flex w-full flex-col relative transition-all  overflow-y-visible", {
          "hover:bg-slate-100 z-10 border-2 px-5 py-5": !abierto,
          "h-svh fixed left-0 top-0 pt-topbar p-3 w-full z-30": abierto
        } )}>
        
        
        <div className="pl-3 pt-2">
          <div className="flex gap-x-3 items-center">

            {
              abierto &&
            <div onClick={cerrarVentana} className="w-10 h-10 rounded-full p-1 text-slate-300 hover:text-slate-500 hover:bg-slate-200 transition-colors sticky top-0 left-0">
              <IconoFlecha/>
            </div>
            }
            <h2  className=" font-bold text-3xl">{ticket?.asunto}</h2>
          </div>
          <VistaRol roles={["admin", "empleado"]}>
            {
              ticket.usuario ?
                <TextoClickable ref={refTextoUsuario}  className="font-bold text-gray-500">
                  {ticket.usuario.nombres} {ticket.usuario.apellidos}
                </TextoClickable>
                :
                <TextoClickable ref={refTextoUsuario} onClick={() => {setParams(params => ({ ...params, email: ticket.email })) }} className="font-bold text-gray-500">
                  Usuario no registrado - {ticket.email}
                </TextoClickable>
                 
            }
          </VistaRol>
          <VistaRol roles={["cliente"]}>
            {
              ticket.empleado &&
                <p className="font-bold text-gray-500">
                  <>{ticket.empleado.nombres} {ticket.empleado.apellidos}  </>
                </p>
            }
          </VistaRol>
        </div>
        <div className="border-b-2 border-gray-2 w-full py-2"/>
        <VisorTexto className="pt-2 pb-4 min-h-32 grow z-30" contenido={ticket?.contenido || ""} />
        <span className="flex justify-between text-white items-center px-4 shrink-0">
          <div className="flex bg-sky-700 p-1 px-2 my-1 rounded-full justify-center items-center">
            <span className="w-3 h-3 animate-pulse bg-cyan-100 rounded-full mx-1"></span>
            <p className="font-bold">
              {ticket.estado.toUpperCase()}
            </p>
          </div>
          <p className="text-gray-500 text-lg text-right w-auto">{new Date(ticket.fecha_creacion).toDateString()}</p>
        </span>
        {
          abierto &&
        <VistaRol roles={["admin", "empleado"]}>
          
          <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
            {
              ticket.estado === "nuevo" &&
            
            <>
              <VistaRol roles={["empleado"]}>
                <div className="grow">

                  <BotonPositivo onClick={handleAccept}>Aceptar</BotonPositivo>
                </div>
              </VistaRol>
              <div className="grow">

                <BotonNegativo>Rechazar</BotonNegativo>
              </div>
            </>
          
            },
            {
              ticket.empleado_asignado === info.idusuario &&

                  <>
                    Te pertenece este ticket
                  </>

            }
          </div>
        </VistaRol>
        }
      </div>
    </>
  )
  ;
}
 
export default Ticket;