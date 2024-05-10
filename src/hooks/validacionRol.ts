import useRolUsuario from "./rol"

const useValidacionRol = (roles: string[], permitirSinAutenticar: boolean = false, todos: boolean = false) => {
  const { rol, isFetching } = useRolUsuario()

  return { isFetching,valido: (todos && !permitirSinAutenticar && rol) || roles.includes(rol) || (permitirSinAutenticar && !isFetching && !rol) }
}

export default useValidacionRol;