import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPositivo = ({ className, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-emerald-500 hover:bg-emerald-400 ", className)} />
  );0
}

export default BotonPositivo;