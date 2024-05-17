import SpinnerPagina from "@/components/UI/SpinnerPagina";
import { DataTicket } from "@/models";
import ticketService from "@/services/ticketService";
import { useQuery } from "@tanstack/react-query";
import Ticket from "./Ticket";


interface ListaTicketsProps {
  params: URLSearchParams,
  idticket?: string
}
 
const ListaTickets = ({ params, idticket }: ListaTicketsProps) => {
  const { data: tickets, isLoading, isSuccess } = useQuery<DataTicket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      if (idticket) return [await ticketService.getTicket(idticket)]
      return ticketService.getTickets(params)
    },
    retry: 0,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <SpinnerPagina/>
  return (
    <div className="flex flex-col gap-y-4 pt-2 px-5 border-gray-200">
      {
        isSuccess &&
        tickets.length > 0 ?

          tickets.map(ticket =>
            <Ticket
              key={ticket.idticket}
              ticket={ticket}
              idticket={idticket}
            />

          )
          :
          <p className="text-gray-500  text-xl text-center">Parece que no hay tickets que mostrar</p>

      }
    </div>
  );
}
 
export default ListaTickets;