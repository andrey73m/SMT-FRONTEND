import cn from "@/cn";
import { PropsWithChildren } from "react";

interface PuntoIndicadorProps extends PropsWithChildren {
  className?: string;
}
 
const PuntoIndicador = ({ children, className }: PuntoIndicadorProps) => {
  return (
    <span className={cn(" text-xs font-bold w-4 h-4 text-center bg-fuchsia-600 rounded-full ", className)}>
      {children}
    </span>

  );
}
 
export default PuntoIndicador;