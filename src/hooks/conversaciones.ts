import { DataTicket } from "@/models"
import { DataConversacion, DataMensajeRecibido } from "@/models/Conversacion"
import conversacionService from "@/services/conversacionService"
import ticketService from "@/services/ticketService"
import { useQuery } from "@tanstack/react-query"

export const useQueryConversaciones = () => {
  return useQuery<DataConversacion[]>({
    queryKey: ["conversaciones"],
    queryFn: conversacionService.obtenerConversacionesUsuario,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: Infinity
  })
}
export const useQueryTicketConversacion = (idticket?: string) => {
  const { data:conversaciones } = useQueryConversaciones();
  return useQuery<DataTicket>({
    queryKey: ["ticket-conversacion"],
    queryFn: () => {
      if (conversaciones){
        const found = conversaciones?.find(c => c.idticket === idticket)
        if (found)
          return found.ticket
      }
      return ticketService.obtenerTicketConversacion(idticket)
    },
    refetchOnWindowFocus: false,
    retry: 0
  })
}

export const useQueryMensajes = (idticket?: string) => {
  return useQuery<DataMensajeRecibido[]>({
    queryKey: ["mensajes-conversacion"],
    queryFn: () => conversacionService.cargarMensajesConversacion(idticket),
    refetchOnWindowFocus: false,
    retry: 0
  })
}