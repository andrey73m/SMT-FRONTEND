import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";


 
const BotonPrimario = ({ className, negar,...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-violet-700 enabled:hover:bg-violet-500",{
      "bg-slate-200 hover:bg-slate-300 text-violet-700":negar
    }, className)}/>
  );
}
 
export default BotonPrimario;