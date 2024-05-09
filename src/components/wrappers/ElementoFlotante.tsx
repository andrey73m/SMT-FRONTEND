import { ReactNode, forwardRef } from "react";
import cn from "@/cn";

export interface ElementoFlotanteProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const ElementoFlotante = forwardRef<HTMLDivElement, ElementoFlotanteProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-col transition-all absolute z-50", className)}
      {...props}
      ref={ref}
    >
      {props.children}

    </div>
  );
})

ElementoFlotante.displayName = "ElementoFlotante"
export default ElementoFlotante;