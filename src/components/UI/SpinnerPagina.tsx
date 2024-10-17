import { HTMLAttributes } from "react";
import Spinner from "./Spinner";
import cn from "@/cn";
 
interface SpinnerPaginaProps extends HTMLAttributes<HTMLDivElement>{}

const SpinnerPagina = ({ className }:SpinnerPaginaProps) => {
  return (
    <div className={cn("flex h-12 justify-center py-2", className)}>
      <Spinner className="h-full" />
    </div>
  );
}
 
export default SpinnerPagina;