import { LegacyRef, ReactNode, forwardRef } from "react";
import ElementoFlotante, { ElementoFlotanteProps } from "./ElementoFlotante";

interface ListaFlotanteProps{
  abierto?: boolean;
  children: ReactNode;
  className?: string;
}
 
const ListaFlotante = forwardRef<HTMLDivElement, ListaFlotanteProps>(({ abierto, ...props }, ref) => {
  return (
    <ElementoFlotante
      enAbierto={["visible scale-y-100" , "invisible scale-y-0"]}
      abierto = {abierto}
      {...props}
      ref={ref}
    >
      {props.children}
    </ElementoFlotante>
  );
})

ListaFlotante.displayName = "ListaFlotante"

export default ListaFlotante;