import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonNegativo = ({ className, negar, simplificar, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-rose-700 enabled:hover:bg-rose-800 ",{
      "bg-slate-200 enabled:hover:bg-slate-300 text-rose-700 ": negar || simplificar,
      "bg-transparent inline-block w-auto enabled:hover:underline enabled:hover:bg-transparent": simplificar,

    }, className)} />
  );
}

export default BotonNegativo;