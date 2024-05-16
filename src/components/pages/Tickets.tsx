import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ListaTickets from "../views/tickets/ListaTickets";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { VistaRol } from "../wrappers";
import AlternarFormularioTicket from "../layout/AlternarFormularioTicket";

 
const PaginaTickets = () => {
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { idticket } = useParams()
  console.log("Params", params)
  return (
    <>
      <ImagenTitulo titulo="Tickets" urlImagen="https://cdn.pixabay.com/photo/2019/06/06/16/02/technology-4256272_1280.jpg"/>
      <VistaRol roles={["cliente"]}>
        <AlternarFormularioTicket />
      </VistaRol>
      <div className="py-5">

        <ListaTickets idticket={idticket} params={params} key={search}/>
      </div>
    </>
  );
}
 
export default PaginaTickets;