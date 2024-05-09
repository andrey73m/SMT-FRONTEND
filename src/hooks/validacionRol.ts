import useRolUsuario from "./rol"

const useValidacionRol = (roles: string[], permitirSinAutenticar: boolean = false) => {
  const { rol, isFetching } = useRolUsuario()
  console.log("rol",rol)
  return { valido:  roles.includes(rol) || (permitirSinAutenticar && !isFetching && !rol) }
}

export default useValidacionRol;