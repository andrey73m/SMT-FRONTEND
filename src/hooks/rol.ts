import { useQuery } from "@tanstack/react-query"
import authService from "../services/authService"


const useRolUsuario = () => {

  const { data } = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => {
      console.log("buscando rol")
      return authService.getRol()
    },
    retry: 1,
    staleTime: 7500,
    refetchOnWindowFocus: false
  })
  
  return { rol: data?.rol }
}
export default useRolUsuario;