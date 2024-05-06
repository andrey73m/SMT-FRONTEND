import { useRolUsuario } from "../../hooks";
import { Navigate } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLElement> {
  roles?: string[];
  sinCuenta?: boolean;
  alt?: string;
}

const Guardian = ({ sinCuenta, roles = [], alt = "/", ...props }: Props) => {
  const rol = useRolUsuario()
  console.log("rol", rol)
  return ((roles.includes(rol) || (sinCuenta && !rol)) ?
    props.children
    :
    <Navigate to={alt} />
  )
}

export default Guardian;