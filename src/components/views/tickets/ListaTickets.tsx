import SpinnerPagina from "@/components/UI/SpinnerPagina";
import { DataTicket } from "@/models";
import ticketService from "@/services/ticketService";
import { useQuery } from "@tanstack/react-query";
import Ticket from "./Ticket";
import { useState } from "react";

interface ListaTicketsProps {
  params: URLSearchParams
}
 
const ListaTickets = ({ params }: ListaTicketsProps) => {
  const [ticketAbierto, setTicketAbierto] = useState("")
  const { data: tickets, isFetching, isSuccess, ...ticketQuery } = useQuery<DataTicket[]>({
    queryKey: ["tickets"],
    queryFn: () => ticketService.getTickets(params),
    retry: 0
  })
  if (isFetching) return <SpinnerPagina/>
  return (
    <div className="flex flex-col gap-y-4 pt-2 px-5 border-gray-200">
      {
        isSuccess &&
        tickets.map(ticket =>
          <Ticket
            key={ticket.idticket}
            ticket={ticket}
            setAbierto={setTicketAbierto}
            abierto={ticketAbierto === ticket.idticket}/>

        )
      }
    </div>
  );
}
 
export default ListaTickets;