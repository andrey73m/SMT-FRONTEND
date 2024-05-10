import { useValidacionRol } from "@/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { VistaRolProps } from "./VistaRol";
import SpinnerPagina from "../UI/SpinnerPagina";

interface Props extends VistaRolProps {
  alt?: string;
}

const Guardian = ({ permitirSinAutenticar, roles = [], alt = "", todos, ...props }: Props) => {
  const { pathname } = useLocation()
  if (!alt){
    alt = "/login?redireccion=" + pathname
  }
  const { valido, isFetching } = useValidacionRol(roles,permitirSinAutenticar, todos)
  if (isFetching) return <SpinnerPagina/>
  return (
    valido ? props.children : <Navigate to={alt} />
  )
}

export default Guardian;