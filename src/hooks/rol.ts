import { useQuery } from "@tanstack/react-query"
import authService from "../services/authService"


const useRolUsuario = () => {

  const query = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => {
      console.log("buscando rol")
      return authService.getRol()
    },
    retry: 1
  })

  return query.data?.rol
}

export default useRolUsuario;