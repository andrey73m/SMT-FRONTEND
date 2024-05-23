import { useQuery } from "@tanstack/react-query"
import authService from "@/services/authService"


export const useRolUsuario = () => {

  const { data, isFetching } = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => {
      return authService.getRol()
    },
    retry: 1,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  })
  
  return { rol: data?.rol, isFetching }
}