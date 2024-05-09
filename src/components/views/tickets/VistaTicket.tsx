import { useQuery } from "@tanstack/react-query";
import ticketService from "@/services/ticketService";
import { useParams } from "react-router-dom";
import VisorTexto from "@/components/UI/VisorTexto";
import Spinner from "@/components/UI/Spinner";
import { useEffect } from "react";
import { VistaRol } from "@/components/wrappers"
import BotonPrimario from "@/components/UI/Botones/BotonPrimario";
import BotonNegativo from "@/components/UI/Botones/BotonNegativo";
import { DataTicket } from "@/models";




interface VistaTicketProps {
  idticket: string
}
 

const VistaTicket = () => {
  const { idticket } = useParams()
  const { data: ticket, isFetching, isSuccess, ...ticketQuery } = useQuery<DataTicket>({
    queryKey:["ticket-prueba"],
    queryFn: () => ticketService.getClientTicket(idticket || ""),
  })
  
  
  const handleAccept = async () => {
    if (idticket){
      const res = await ticketService.aceptarTicket(idticket)
      console.log(res)
    }
  }
  useEffect(() => {
    ticketQuery.refetch()
  },[idticket])
  if (isSuccess){
    console.log("ticket",ticket)
  }
  if (isFetching) return (<Spinner/>)
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      {
        ticket &&
      <div className="flex flex-col px-2 md:px-32 relative transition-all mt-topbar">
        <div>
          <h2  className=" font-bold text-3xl">{ticket?.asunto}</h2>
          <p className="font-bold text-gray-500">
            {
              ticket.email ?
                <>Usuario no registrado -{ticket.email}</> :
                <>{ticket.usuario.nombres} {ticket.usuario.apellidos}  </>
            }
          </p>
        </div>
        <VisorTexto className="" contenido={ticket?.contenido || ""} />
        <span className="flex justify-between text-white items-center px-4">
          <div className="flex bg-sky-700 p-1 px-2 my-1 rounded-full justify-center items-center">
            <span className="w-3 h-3 animate-pulse bg-cyan-100 rounded-full mx-1"></span>
            <p className="font-bold">
              {ticket.estado.toUpperCase()}
            </p>
          </div>
          <p className="text-gray-500 text-lg text-right w-auto">{new Date(ticket.fecha_creacion).toDateString()}</p>
        </span>
        <VistaRol roles={["admin", "empleado"]}>
          
          <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
            {
              ticket.estado === "nuevo" &&
            
            <>
              <VistaRol roles={["empleado"]}>
                <div className="grow">

                  <BotonPrimario onClick={handleAccept}>Aceptar</BotonPrimario>
                </div>
              </VistaRol>
              <div className="grow">

                <BotonNegativo>Rechazar</BotonNegativo>
              </div>
            </>
          
            }
          </div>
        </VistaRol>
      </div>
      }
    </>
  )
  ;
}
 
export default VistaTicket;