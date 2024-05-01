import { useRolUsuario } from "../../hooks";
interface Props extends React.HTMLAttributes<HTMLElement>{
  roles: string[];
}

const VistaRol = (props : Props) => {
  const rol = useRolUsuario()
  return (props.roles.includes(rol) && props.children)
}

export default VistaRol;