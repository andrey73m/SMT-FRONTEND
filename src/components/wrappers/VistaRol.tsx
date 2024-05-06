import { useRolUsuario } from "../../hooks";
interface Props extends React.HTMLAttributes<HTMLElement>{
  roles: string[];
  sinCuenta: boolean
}

const VistaRol = ({ sinCuenta, roles,...props } : Props) => {
  const rol = useRolUsuario()
  console.log("rol",rol)
  return ((roles.includes(rol) || (sinCuenta && !rol)) && props.children)
}

export default VistaRol;