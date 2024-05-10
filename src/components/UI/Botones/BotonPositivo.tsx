import cn from "@/cn";
import Boton, { BotonProps } from "./Boton";



const BotonPositivo = ({ className, ...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-teal-500 hover:bg-teal-400 ", className)} />
  );0
}

export default BotonPositivo;