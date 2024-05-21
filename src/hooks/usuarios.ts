import { useQuery } from "@tanstack/react-query"
import authService from "@/services/authService"
import { DataUsuario } from "@/models/DataTicket"

export const useClientes = () => {
  return useQuery<DataUsuario[]>({
    queryKey:["usuarios","clientes"],
    queryFn: authService.obtenerClientes,
    refetchOnWindowFocus: false,
    retry: 1
  })
}
