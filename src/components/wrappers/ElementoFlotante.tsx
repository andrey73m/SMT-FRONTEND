import { ReactNode, forwardRef } from "react";

export interface ElementoFlotanteProps {
  abierto?: boolean;
  children: ReactNode;
  className?: string;
  enAbierto: [string,string]
}

const ElementoFlotante = forwardRef<HTMLDivElement, ElementoFlotanteProps>(({ abierto, enAbierto, className, ...props }, ref) => {
  return (
    <div
      className={`
        flex
        flex-col
        ${abierto ? enAbierto[0] : enAbierto[1]} 
        transition-all
        absolute 
        z-50
        ${className}
      `}
      ref={ref}
    >
      {props.children}

    </div>
  );
})

ElementoFlotante.displayName = "ElementoFlotante"
export default ElementoFlotante;