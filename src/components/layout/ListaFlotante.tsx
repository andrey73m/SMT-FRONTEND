import { ReactNode, forwardRef } from "react";

interface ListaFlotanteProps {
  abierto?: boolean;
  children: ReactNode;
  className?: string
}
 
const ListaFlotante = forwardRef<HTMLDivElement, ListaFlotanteProps>(({ abierto, className,...props }, ref) => {
  return (
    <div
      className={`
        flex
        flex-col
        ${abierto ? "visible scale-y-100" : "invisible scale-y-0"} 
        transition-all
        absolute 
        ${className}
      `}
      ref={ref}
    >
      {props.children}
      
    </div>
  );
})
 
ListaFlotante.displayName = "ListaFlotante"
export default ListaFlotante;