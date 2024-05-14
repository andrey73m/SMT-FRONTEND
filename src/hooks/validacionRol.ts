import useRolUsuario from "./rol"

const useValidacionRol = (roles?: string[], permitirSinAutenticar: boolean = false) => {
  const { rol, isFetching } = useRolUsuario()
  return {
    rol,
    isFetching,
    valido:
      (!roles && !permitirSinAutenticar && rol)
      || (roles && roles.includes(rol))
      || (permitirSinAutenticar && !isFetching && !rol)
  }

}

export default useValidacionRol;