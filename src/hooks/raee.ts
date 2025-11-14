import { useQuery } from "@tanstack/react-query"
import { useSesion } from "./sesion"
import RAEEService from "@/services/RAEEService"

export const useQueryRegistrosRAEE = () => {
  const {info: {idusuario}} = useSesion()
  const { data, ...query } = useQuery({
    queryKey: ["raee-usuario"],
    queryFn: () => {
      return RAEEService.obtenerRegistros()
    },
    retry: 1,
    refetchOnWindowFocus: false
  })
  
  return { data: data?.filter(d => d.userId === idusuario), ...query}
}