import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPrimario = ({ className, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-amber-400 hover:bg-amber-300", className)} />
  );
}

export default BotonPrimario;