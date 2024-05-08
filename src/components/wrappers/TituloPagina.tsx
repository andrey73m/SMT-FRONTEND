import { ReactNode, useEffect } from "react";

interface TituloPaginaProps {
  titulo: string;
  children: ReactNode;
}
 
const TituloPagina = ({ titulo, children }: TituloPaginaProps) => {
  useEffect(() => {
    console.log("Cambiando titulo")
    document.title = titulo
  }, [titulo])
  return children;
}
 
export default TituloPagina;