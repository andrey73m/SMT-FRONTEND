import { HTMLAttributes } from "react";
import Spinner from "./Spinner";
import cn from "@/cn";
 
interface SpinnerPaginaProps extends HTMLAttributes<HTMLDivElement>{}

const SpinnerPagina = ({ className }:SpinnerPaginaProps) => {
  return (
    <div className={cn("flex h-16 justify-center", className)}>
      <Spinner className="h-full" />
    </div>
  );
}
 
export default SpinnerPagina;