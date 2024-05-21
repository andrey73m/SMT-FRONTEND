import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPrimario = ({ className, negar,...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-amber-400 hover:bg-amber-300",{
      "bg-slate-200 hover:bg-slate-300 text-amber-400": negar
    }, className)} />
  );
}

export default BotonPrimario;