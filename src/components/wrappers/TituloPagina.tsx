import { ReactNode, useMemo } from "react";

interface TituloPaginaProps {
  titulo: string;
  children: ReactNode;
}
 
const TituloPagina = ({ titulo, children }: TituloPaginaProps) => {
  useMemo(() => {
    console.log("Cambiando titulo")
    document.title = titulo
  }, [titulo])
  return children;
}
 
export default TituloPagina;