import { useQuery } from "@tanstack/react-query";
import authService from "../services/authService";


const useRolUsuario = () => {
  const token: string = authService.getToken();

  const query = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => authService.getRol(token),
  })

  return query.data?.rol
}

export default useRolUsuario;