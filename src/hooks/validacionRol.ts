import useRolUsuario from "./rol"

const useValidacionRol = (roles: string[], permitirSinAutenticar: boolean = false) => {
  const rol = useRolUsuario()

  return { valido: roles.includes(rol) || (permitirSinAutenticar && !rol) }
}

export default useValidacionRol;