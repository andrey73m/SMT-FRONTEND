import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonNegativo = ({ className, negar, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-rose-700 hover:bg-rose-800 ",{
      "bg-slate-200 hover:bg-slate-300 text-rose-700": negar
    }, className)} />
  );
}

export default BotonNegativo;