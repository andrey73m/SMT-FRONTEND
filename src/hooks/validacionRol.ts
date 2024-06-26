import { useRolUsuario } from "./rol"
import { useSesion } from "./sesion";

export interface opcionesValidacionRol{
  roles?: string[];
  permitirSinAutenticar?: boolean
  esperarRol?: boolean
  or?: boolean
}

export const useValidacionRol = ({ roles, permitirSinAutenticar, esperarRol = true, or }:opcionesValidacionRol) => {
  const { rol, isFetching } = useRolUsuario()
  const { haySesion } = useSesion()
  return {
    rol,
    isFetching,
    valido:
      or ||
      ((!esperarRol && !roles && haySesion && !permitirSinAutenticar)
      || (!roles && rol && !permitirSinAutenticar)
      || (roles && roles.includes(rol))
      || (permitirSinAutenticar && !esperarRol && !rol)
      || (permitirSinAutenticar && !isFetching && !rol))
  }

}