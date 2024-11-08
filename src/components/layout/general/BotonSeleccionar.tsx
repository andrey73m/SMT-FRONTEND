import IconoCheck from "@/components/icons/Check";
import cn from "@/cn";

export interface BotonSeleccionarProps extends React.HTMLAttributes<HTMLDivElement>  {
  seleccionado?: boolean
  deshabilitado?: boolean
}


const BotonSeleccionar = ({ className, seleccionado, deshabilitado ,...props }: BotonSeleccionarProps) => {
  return (
    <div className={cn(className, {
      "cursor-pointer hover:text-green-300 transition-all" : !seleccionado && !deshabilitado,
      "cursor-default text-green-500" : seleccionado,
      "cursor-not-allowed text-gray-500": deshabilitado
    })} {...props}>
      <IconoCheck filled={seleccionado || deshabilitado}/>
    </div>
  );
}
 
export default BotonSeleccionar;