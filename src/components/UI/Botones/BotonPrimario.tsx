import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";


 
const BotonPrimario = ({ className, negar,...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-violet-700 enabled:hover:bg-violet-500 disabled:bg-violet-400",{
      "bg-slate-200 enabled:hover:bg-slate-300 text-violet-700 disabled:bg-slate-100 disabled:text-slate-300":negar
    }, className)}/>
  );
}
 
export default BotonPrimario;