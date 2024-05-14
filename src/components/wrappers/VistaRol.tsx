import { useValidacionRol } from "@/hooks";


export interface VistaRolProps extends React.HTMLAttributes<HTMLElement>{
  roles?: string[];
  permitirSinAutenticar?: boolean
  todos?: boolean
}

const VistaRol = ({ permitirSinAutenticar, roles,...props } : VistaRolProps) => {
  const { valido } = useValidacionRol(roles, permitirSinAutenticar)
  return (valido && props.children)
  
}

export default VistaRol;