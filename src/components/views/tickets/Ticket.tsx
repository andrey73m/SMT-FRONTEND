
import ticketService from "@/services/ticketService";

import VisorTexto from "@/components/UI/VisorTexto";

import { VistaRol } from "@/components/wrappers"
import BotonNegativo from "@/components/UI/Botones/BotonNegativo";
import { DataTicket } from "@/models";
import cn from "@/cn";
import BotonPositivo from "@/components/UI/Botones/BotonPositivo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSesion } from "@/hooks";
import { useNavigate } from "react-router-dom";
import CabeceraTicket from "./CabeceraTicket";
import { BotonSecundario } from "@/components/UI/Botones";
import CuerpoTicket from "./CuerpoTicket";
import AlternarFormularioGestionarTicket from "@/components/layout/AlternarFormularioGestion";
import { EstadosTicket } from "@/models/DataTicket";
import { AxiosError } from "axios";

import { toast, Bounce, ToastContainer } from "react-toastify";


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
        toast("Parece que el ticket ya fue asignado a alguien mas", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        })
      }
    }
  })
  const handleAccept = async () => {
    if (ticket.idticket)
      acceptMutation.mutate()
  }
  const navigate = useNavigate()
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      <div className={cn("bg-white flex w-full flex-col relative transition-all  overflow-y-auto", {
        "z-10 border-2 px-5 py-5": !abierto,
        "h-full fixed left-0 top-0 pt-topbar p-3 w-full z-30": abierto
      })}>
        <CabeceraTicket abierto={abierto} ticket={ticket}/>
        <div className="border-b-2 border-gray-2 w-full py-2"/>
        <CuerpoTicket ticket={ticket}/>
        {
          abierto &&
        <VistaRol roles={["admin", "empleado"]}>
          
          <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
            {
              ticket.estado === EstadosTicket.NUEVO &&
            
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
          
            }
            {
              //TODO CONDICIONES PARA CLASIFICACION DE LOS ADMINS
              ticket.empleado_asignado === info.idusuario &&

                  <>
                    {
                      <AlternarFormularioGestionarTicket recienAceptado={ticket.estado === EstadosTicket.ACEPTADO} ticket ={ticket}/>
                    }
                  
                  </>

            }
          </div>
        </VistaRol>
        
        }
        {!abierto && <BotonSecundario className="my-2" onClick={() => navigate(`/tickets/${ticket.idticket}`)}>Ir a detalles</BotonSecundario>}
      </div>
    </>
  )
  ;
}
 
export default Ticket;