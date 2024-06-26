import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ListaTickets from "../views/tickets/ListaTickets";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { VistaRol } from "../wrappers";
import AlternarFormularioSticky from "../layout/AlternarFormularioSticky";
import FormularioTicket from "../formularios/ticket";
import { BotonPrimario } from "../UI/Botones";
import cn from "@/cn";
 
const PaginaTickets = () => {
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { idticket } = useParams()
  return (
    <>
      <ImagenTitulo titulo="Tickets" urlImagen="https://cdn.pixabay.com/photo/2019/06/06/16/02/technology-4256272_1280.jpg"/>
      <VistaRol roles={["cliente"]}>
        <AlternarFormularioSticky className="z-20" texto="¿Tienes un nuevo problema? Escríbenos un ticket" Formulario={FormularioTicket} Boton={BotonPrimario}/>

      </VistaRol>
      <div className={cn("py-5 z-10",{
        "z-40": idticket
      })}>

        <ListaTickets idticket={idticket} params={params} key={search}/>
      </div>
    </>
  );
}
 
export default PaginaTickets;