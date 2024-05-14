import { useValidacionRol } from "@/hooks";
import { Navigate } from "react-router-dom";
import { VistaRolProps } from "./VistaRol";
import SpinnerPagina from "../UI/SpinnerPagina";
import { useCreateRedireccionQuery } from "@/hooks/createQuery";
import { opcionesValidacionRol } from "@/hooks/validacionRol";

interface Props extends VistaRolProps {
  alt?: string;
}

const Guardian = ({ alt = "", ...props }: Props) => {
  const param = useCreateRedireccionQuery()
  const { valido, isFetching, rol } = useValidacionRol(props as opcionesValidacionRol)
  if (!alt){
    alt = rol ? "/" : "/login?" + param
  }
  if (isFetching){
    return(
      <div className="flex justify-center bg-black/50 absolute top-0 left-0 h-screen w-screen backdrop-blur-lg items-center">
        <SpinnerPagina />
      </div>)
  }
  return (
    valido ? props.children : <Navigate to={alt} />
  )
}

export default Guardian;