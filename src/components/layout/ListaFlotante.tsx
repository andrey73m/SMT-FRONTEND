import { ReactNode } from "react";

interface ListaFlotanteProps {
  abierto?: boolean;
  children: ReactNode;
  className?: string
}
 
const ListaFlotante = ({ abierto, className,...props }: ListaFlotanteProps) => {
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
    >
      {props.children}
    </div>
  );
}
 
export default ListaFlotante;