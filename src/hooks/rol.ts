import { useQuery } from "@tanstack/react-query"
import authService from "../services/authService"


const useRolUsuario = () => {

  const { data, isFetching } = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => {
      console.log("buscando rol")
      return authService.getRol()
    },
    retry: 1,
    staleTime: 7500,
    refetchOnWindowFocus: false
  })
  
  return { rol: data?.rol, isFetching }
}
export default useRolUsuario;