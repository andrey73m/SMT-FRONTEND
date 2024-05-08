import { useQuery } from "@tanstack/react-query";
import ticketService from "../../../services/ticketService";
import { useParams } from "react-router-dom";
import VisorTexto from "../../UI/VisorTexto";
import Spinner from "../../UI/Spinner";
import { useEffect, useRef } from "react";
import VistaRol from "../../wrappers/VistaRol";
import BotonPrimario from "../../UI/Botones/BotonPrimario";
import BotonNegativo from "../../UI/Botones/BotonNegativo";


interface DataTicket{
  idticket: string;
  empleado_asignado: string;
  idtipo_servicio: number;
  asunto: string;
  contenido: string;
  estado: string;
  prioridad: string;
  fecha_creacion:Date
}

interface VistaTicketProps {
  idticket: string
}
 

const VistaTicket = () => {
  const { idticket } = useParams()
  const ticket = useQuery<DataTicket>({
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
    ticket.refetch()
  },[idticket])
  if (ticket.isSuccess){
    console.log("ticket",ticket.data)
  }
  if (ticket.isLoading) return (<Spinner/>)
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      {
        ticket.data &&
      <div className="flex flex-col px-2 md:px-32 relative transition-all mt-12">
        <h2 id="TITULO_TICKET" className=" font-bold md:text-center text-3xl">{ticket.data?.asunto}</h2>
        <VisorTexto contenedor="TITULO_TICKET" contenido={ticket.data?.contenido || ""} />
        <span className="flex justify-between text-white items-center px-4">
          <div className="flex bg-sky-700 p-1 px-2 my-1 rounded-full justify-center items-center">
            <span className="w-3 h-3 animate-pulse bg-cyan-100 rounded-full mx-1"></span>
            <p className="font-bold">
              {ticket.data.estado.toUpperCase()}
            </p>
          </div>
          <p className="text-gray-500 text-lg text-right w-auto">{new Date(ticket.data.fecha_creacion).toDateString()}</p>
        </span>
        <VistaRol roles={["admin", "empleado"]}>
          
          <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
            {
              ticket.data.estado === "nuevo" &&
            
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