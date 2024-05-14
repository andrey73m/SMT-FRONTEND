import useRolUsuario from "./rol"

export interface opcionesValidacionRol{
  roles?: string[];
  permitirSinAutenticar?: boolean
  esperarRol?: boolean
  or?: boolean
}

const useValidacionRol = ({ roles, permitirSinAutenticar, esperarRol = true, or }:opcionesValidacionRol) => {
  const { rol, isFetching } = useRolUsuario()
  return {
    rol,
    isFetching,
    valido:
      or ||
      ((!roles && !permitirSinAutenticar && rol)
      || (roles && roles.includes(rol))
      || (permitirSinAutenticar && !esperarRol && !rol)
      || (permitirSinAutenticar && !isFetching && !rol))
  }

}

export default useValidacionRol;