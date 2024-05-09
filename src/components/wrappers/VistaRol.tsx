import { useValidacionRol } from "@/hooks";


interface Props extends React.HTMLAttributes<HTMLElement>{
  roles: string[];
  permitirSinAutenticar?: boolean
}

const VistaRol = ({ permitirSinAutenticar, roles,...props } : Props) => {
  const { valido } = useValidacionRol(roles, permitirSinAutenticar)
  return (valido && props.children)
  
}

export default VistaRol;