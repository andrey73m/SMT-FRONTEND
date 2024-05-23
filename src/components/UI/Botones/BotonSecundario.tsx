import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPrimario = ({ className,simplificar, negar,...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-amber-400 enabled:hover:bg-amber-300",{
      "bg-slate-200 enabled:hover:bg-slate-300 text-amber-500 font-bold": negar || simplificar
    }, className)} simplificar={simplificar} />
  );
}

export default BotonPrimario;