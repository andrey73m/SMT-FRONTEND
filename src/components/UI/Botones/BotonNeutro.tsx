import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonNeutro = ({ className, negar, simplificar, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-sky-600 enabled:hover:bg-sky-700 ", {
      "bg-slate-200 enabled:hover:bg-slate-300 text-sky-600 ": negar || simplificar,
      "bg-transparent inline-block w-auto enabled:hover:underline enabled:hover:bg-transparent": simplificar,

    }, className)} />
  );
}

export default BotonNeutro;