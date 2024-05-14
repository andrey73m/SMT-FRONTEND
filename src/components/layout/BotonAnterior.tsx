import cn from "@/cn"
import IconoFlecha from "../icons/Flecha"
import { useRedireccionParam } from "@/hooks/parametroRedireccion"
import { useNavigate } from "react-router-dom"

interface BotonAteriorProps extends React.HTMLAttributes<HTMLDivElement>{
  defaultPath?: string | number
}
 
const BotonAterior = ({ className, defaultPath, ...props }:BotonAteriorProps) => {
  const redireccion = useRedireccionParam(defaultPath)
  const navigate = useNavigate()
  const cerrar = () => {
    navigate(redireccion)
  }
  return (

    <div onClick={cerrar} {...props} className={cn("flex w-10 h-auto rounded-full p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-200",className)}>
      <IconoFlecha />
    </div>
  )
}
 
export default BotonAterior;