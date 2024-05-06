import { useQuery } from "@tanstack/react-query"
import authService from "../services/authService"


const useRolUsuario = () => {

  const query = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: authService.getRol,
    retry: 1
  })

  return query.data?.rol
}

export default useRolUsuario;