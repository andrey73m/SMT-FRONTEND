import IconoCheck from "@/components/icons/Check";
import cn from "@/cn";

export interface BotonSeleccionarProps extends React.HTMLAttributes<HTMLDivElement>  { seleccionado?: boolean }

const BotonSeleccionar = ({ className, seleccionado ,...props }: BotonSeleccionarProps) => {
  return (
    <div className={cn(className, {
      "cursor-pointer hover:text-green-300 transition-all" : !seleccionado, "cursor-default text-green-500" : seleccionado
    })} {...props}>
      <IconoCheck filled={seleccionado}/>
    </div>
  );
}
 
export default BotonSeleccionar;