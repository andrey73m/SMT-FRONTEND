import { useValidacionRol } from "@/hooks";
import { opcionesValidacionRol } from "@/hooks/validacionRol";
import { PropsWithChildren } from "react";


export interface VistaRolProps extends opcionesValidacionRol, PropsWithChildren{}

const VistaRol = (props : VistaRolProps) => {
  const { valido } = useValidacionRol(props as opcionesValidacionRol)
  return (valido && props.children)
  
}

export default VistaRol;