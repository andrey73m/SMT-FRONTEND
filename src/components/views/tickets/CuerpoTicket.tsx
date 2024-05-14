import cn from "@/cn";
import { VisorTexto } from "@/components/UI";
import { DataTicket } from "@/models";
import { EstadosTicket } from "@/models/DataTicket";
import { CapitalizeString } from "@/utils";

interface CuerpoTicketProps {
  ticket: DataTicket
}


const CuerpoTicket = ({ ticket }: CuerpoTicketProps) => {
  const fecha = new Date(ticket.fecha_creacion).toDateString()

  const tagEstado = () => {
    const estadoCapital = CapitalizeString(ticket.estado)
    return (
      <div className={cn("flex my-2 p-1 px-2 py-1 rounded-full justify-center items-center",{
        "bg-teal-400":ticket.estado === EstadosTicket.NUEVO,
        "bg-violet-500": ticket.estado === EstadosTicket.ACEPTADO,
        "bg-teal-600": ticket.estado === EstadosTicket.LISTO,
        "bg-amber-400": ticket.estado === EstadosTicket.EN_PROCESO,
        "bg-blue-500": ticket.estado === EstadosTicket.RESUELTO,
        "bg-gray-500": ticket.estado === EstadosTicket.CERRADO
      })}>
        <span className="w-3 h-3 animate-pulse bg-white/75 rounded-full mx-1"></span>
        <p className="font-bold">
          {estadoCapital}
        </p>
          
      </div>
    )
  }
  
  return (
    <>
      <VisorTexto className="pt-2 pb-4 min-h-32 grow z-30" contenido={ticket?.contenido || ""} />
      <span className="flex justify-between text-white items-center px-4 shrink-0">

        {tagEstado()}

        <p className="text-gray-500 text-lg text-right w-auto">{fecha}</p>
      </span>
    </>
  );
}
 
export default CuerpoTicket;