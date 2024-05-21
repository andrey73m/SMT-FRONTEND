import IconoEditar from "@/components/icons/Editar";
import BotonTabla, { BotonTablaProps } from "./BotonTabla";
import cn from "@/cn";


const BotonEditar = ({ className ,...props }: BotonTablaProps) => {
  return (
    <BotonTabla className={cn("hover:text-green-500 transition-all", className)} {...props}>
      <IconoEditar/>
    </BotonTabla>
  );
}
 
export default BotonEditar;