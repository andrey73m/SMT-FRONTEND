import { DataConversacion } from "@/models/Conversacion"
import conversacionService from "@/services/conversacionService"
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