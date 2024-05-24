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

          tickets.sort((t) => {
            if (t.estado === EstadosTicket.CERRADO) return 1
            if (t.prioridad)
              return t.prioridad === PrioridadesTicket.BAJA ? 1 :
                t.prioridad === PrioridadesTicket.MEDIA ? 0 :
                  t.prioridad === PrioridadesTicket.ALTA ?  -1 : 1
            if (t.estado)
              return t.estado === EstadosTicket.NUEVO ? -1 : 0
               
            return 1
          }).map(ticket =>
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