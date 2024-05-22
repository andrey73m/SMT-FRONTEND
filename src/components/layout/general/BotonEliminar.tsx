import IconoEliminar from "@/components/icons/Eliminar";
import BotonTabla, { BotonTablaProps } from "./BotonTabla";
import cn from "@/cn";
 
const BotonEliminar = ({ className,...props }: BotonTablaProps) => {
  return (
    <BotonTabla className={cn("hover:text-red-500 transition-all", className)}{...props}>
      <IconoEliminar/>
    </BotonTabla>
  );
}
 
export default BotonEliminar;