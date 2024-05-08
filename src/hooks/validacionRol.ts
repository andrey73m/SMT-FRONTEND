import useRolUsuario from "./rol"

const useValidacionRol = (roles: string[], permitirSinAutenticar: boolean = false) => {
  const { rol } = useRolUsuario()
  console.log("rol",rol)
  return { valido:  roles.includes(rol) || (permitirSinAutenticar && !rol) }
}

export default useValidacionRol;