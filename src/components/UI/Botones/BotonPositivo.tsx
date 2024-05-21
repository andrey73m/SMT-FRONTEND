import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPositivo = ({ className,negar , ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-emerald-500 hover:bg-emerald-400 ",{
      "bg-slate-200 hover:bg-slate-300 text-emerald-500": negar
    }, className)} />
  );
}

export default BotonPositivo;