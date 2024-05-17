import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ListaTickets from "../views/tickets/ListaTickets";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { VistaRol } from "../wrappers";
import AlternarFormulario from "../layout/AlternarFormularioTicket";
import FormularioTicket from "../formularios/ticket";
 
const PaginaTickets = () => {
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { idticket } = useParams()
  console.log("Params", params)
  return (
    <>
      <ImagenTitulo titulo="Tickets" urlImagen="https://cdn.pixabay.com/photo/2019/06/06/16/02/technology-4256272_1280.jpg"/>
      <VistaRol roles={["cliente"]}>
        <AlternarFormulario texto="¿Tienes un nuevo problema? Escríbenos un ticket">
          <FormularioTicket/>
        </AlternarFormulario>

      </VistaRol>
      <div className="py-5 z-20">

        <ListaTickets idticket={idticket} params={params} key={search}/>
      </div>
    </>
  );
}
 
export default PaginaTickets;