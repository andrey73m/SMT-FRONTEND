import SpinnerPagina from "@/components/UI/SpinnerPagina";
import { DataTicket } from "@/models";
import ticketService from "@/services/ticketService";
import { useQuery } from "@tanstack/react-query";
import Ticket from "./Ticket";
import { Navigate } from "react-router-dom";
import { EstadosTicket, PrioridadesTicket } from "@/models/DataTicket";


interface ListaTicketsProps {
  params: URLSearchParams,
  idticket?: string
}
 
const ListaTickets = ({ params, idticket }: ListaTicketsProps) => {
  const { data: tickets, isFetching, isSuccess } = useQuery<DataTicket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      if (idticket) return [await ticketService.getTicket(idticket)]
      return ticketService.getTickets(params)
    },
    retry: 0,
    refetchOnWindowFocus: false,
    
  })

  if (isFetching) return <SpinnerPagina/>
  return (
    <div className="flex flex-col gap-y-4 pt-2 px-5 border-gray-200">
      {
        isSuccess &&
        tickets.length > 0 ?

        // tickets.sort((t) => {
        //   if (t.estado === EstadosTicket.CERRADO) return 1
        //   if (t.prioridad)
        //     return t.prioridad === PrioridadesTicket.BAJA ? 1 :
        //       t.prioridad === PrioridadesTicket.MEDIA ? 0 :
        //         t.prioridad === PrioridadesTicket.ALTA ?  -1 : 1
        //   if (t.estado)
        //     return t.estado === EstadosTicket.NUEVO ? -1 : 0
               
          //   return 1
          // })
          tickets.sort((a, b) => {
            // 1) Cerrados al final
            if (a.estado === EstadosTicket.CERRADO && b.estado !== EstadosTicket.CERRADO) return 0;
            if (b.estado === EstadosTicket.CERRADO && a.estado !== EstadosTicket.CERRADO) return -1;

            // 2) Nuevos justo antes de cerrados
            if (a.estado === EstadosTicket.NUEVO && b.estado !== EstadosTicket.NUEVO) return 0;
            if (b.estado === EstadosTicket.NUEVO && a.estado !== EstadosTicket.NUEVO) return -1;

            // 3) De los que quedan, los que tienen prioridad antes que los que no
            const mapPrio: any = {
              [PrioridadesTicket.ALTA]: 1,
              [PrioridadesTicket.MEDIA]: 2,
              [PrioridadesTicket.BAJA]: 3
            };
            // Si no tiene prioridad, le damos un valor alto (4) para que quede después
            const aPrio = a.prioridad && mapPrio[a.prioridad] ? mapPrio[a.prioridad] : 4;
            const bPrio = b.prioridad && mapPrio[b.prioridad] ? mapPrio[b.prioridad] : 4;
            if (aPrio !== bPrio) return aPrio - bPrio;

            // 4) Empate: mantiene orden estable
            return 0;
          })
            .map(ticket =>
              <Ticket
                key={ticket.idticket}
                ticket={ticket}
                idticket={idticket}
              />

            )
          : <>
            {
            
              
              idticket ?
                <Navigate to="/tickets"/>
                :  <p className="text-gray-500  text-xl text-center">Parece que no hay tickets que mostrar</p>
            }
          </>

      }
    </div>
  );
}
 
export default ListaTickets;