
import ticketService from "@/services/ticketService";


import { VistaRol } from "@/components/wrappers"
import BotonNegativo from "@/components/UI/Botones/BotonNegativo";
import { DataTicket } from "@/models";
import cn from "@/cn";
import BotonPositivo from "@/components/UI/Botones/BotonPositivo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSesion } from "@/hooks";
import { useNavigate } from "react-router-dom";
import CabeceraTicket from "./CabeceraTicket";
import { BotonPrimario, BotonSecundario } from "@/components/UI/Botones";
import CuerpoTicket from "./CuerpoTicket";
import AlternarFormularioGestionarTicket from "@/components/layout/AlternarFormularioGestion";
import { EstadosTicket } from "@/models/DataTicket";
import { AxiosError } from "axios";
import { notificarError } from "@/utils";

interface TicketProps{
  ticket: DataTicket
  idticket?: string
  // eslint-disable-next-line no-unused-vars
}
 


const Ticket = ({ ticket, idticket }: TicketProps) => {
  
  const { info } = useSesion()
  const queryClient = useQueryClient()

  const abierto = idticket === ticket.idticket
  const acceptMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.aceptarTicket(ticket.idticket),
    onSuccess: (updated) => {
      const data = queryClient.getQueryData<DataTicket[]>(["tickets"])
      queryClient.setQueryData(["tickets"], data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
    },
    onError: (error) => {
      console.log(error)
      const e = error as AxiosError
      if (e.response?.status === 409){
        console.log("No puedes aceptarlo")
        notificarError("Este ticket ya fue aceptado")
      }
    }
  })
  const discardMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.descartarTicketUsuario(ticket.idticket),
    onSuccess: (updated) => {
      const data = queryClient.getQueryData<DataTicket[]>(["tickets"])
      queryClient.setQueryData(["tickets"], data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
    },
    onError: (error) => {
    }
  })
  const reopenMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.reabrirTicket(ticket.idticket),
    onSuccess: (updated) => {
      const data = queryClient.getQueryData<DataTicket[]>(["tickets"])
      queryClient.setQueryData(["tickets"], data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
    },
    onError: (error) => {
    }
  })
  const handleAccept = async () => {
    if (ticket.idticket)
      acceptMutation.mutate()
  }
  const handleDiscard = async () => {
    if (ticket.idticket)
      discardMutation.mutate()
  }
  const handleReopen = async () => {
    if (ticket.idticket)
      reopenMutation.mutate()
  }
  const navigate = useNavigate()
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      <div  className={cn("bg-white flex w-full flex-col relative transition-all  overflow-y-auto", {
        "z-10 border-2 px-5 py-5": !abierto,
        "h-full fixed left-0 top-0 pt-topbar p-3 w-full z-30": abierto
      })}>
        <CabeceraTicket abierto={abierto} ticket={ticket}/>
        <div className="border-b-2 border-gray-2 w-full py-2"/>
        <CuerpoTicket ticket={ticket}/>
        {
          abierto &&
            <>
              {
                ticket.estado !== EstadosTicket.CERRADO ?
                  <>
                    <VistaRol roles={["admin", "empleado"]}>
          
                      <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
                        <>
                          {
                            !ticket.empleado_asignado &&
                    <VistaRol roles={["empleado"]}>
                      <div className="grow">

                        <BotonPositivo onClick={handleAccept}>Aceptar</BotonPositivo>
                      </div>
                    </VistaRol>
                          }
                          <div className="grow">

                            <BotonNegativo onClick={handleDiscard}>Descartar</BotonNegativo>
                          </div>
                        </>
                      </div>
                    </VistaRol>
                    <VistaRol roles={["admin"]} or={ticket.empleado_asignado === info.idusuario}>
                      <AlternarFormularioGestionarTicket recienAceptado={ticket.estado === EstadosTicket.ACEPTADO} ticket={ticket} />
                    </VistaRol>
                  </>
                  :
                  <VistaRol roles={["admin"]}>
                    <BotonSecundario onClick={handleReopen}>Reabrir</BotonSecundario>
                  </VistaRol>
              }
            </>
        
        //TODO CONDICIONES PARA CLASIFICACION DE LOS ADMINS
        }
        
        {!abierto && <BotonPrimario negar className="my-2" onClick={() => navigate(`/tickets/${ticket.idticket}`)}>Ir a detalles</BotonPrimario>}
      </div>
    </>
  )
  ;
}
 
export default Ticket;