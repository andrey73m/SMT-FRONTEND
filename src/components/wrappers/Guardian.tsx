import { useValidacionRol } from "../../hooks";
import { Navigate } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLElement> {
  roles?: string[];
  permitirSinAutenticar?: boolean;
  alt?: string;
}

const Guardian = ({ permitirSinAutenticar, roles = [], alt = "/", ...props }: Props) => {
  const { valido } = useValidacionRol(roles,permitirSinAutenticar)
  return (
    valido ? props.children : <Navigate to={alt} />
  )
}

export default Guardian;