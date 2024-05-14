import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPrimario = ({ className, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-slate-200 hover:bg-slate-300 text-violet-600 ", className)} />
  );
}

export default BotonPrimario;