import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ListaTickets from "../views/tickets/ListaTickets";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { VistaRol } from "../wrappers";
import AlternarFormularioSticky from "../layout/AlternarFormularioSticky";
import FormularioTicket from "../formularios/ticket";
import { BotonPrimario } from "../UI/Botones";
 
const PaginaTickets = () => {
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { idticket } = useParams()
  console.log("Params", params)
  return (
    <>
      <ImagenTitulo titulo="Tickets" urlImagen="https://cdn.pixabay.com/photo/2019/06/06/16/02/technology-4256272_1280.jpg"/>
      <VistaRol roles={["cliente"]}>
        <AlternarFormularioSticky texto="¿Tienes un nuevo problema? Escríbenos un ticket" Formulario={FormularioTicket} Boton={BotonPrimario}/>

      </VistaRol>
      <div className="py-5 z-20">

        <ListaTickets idticket={idticket} params={params} key={search}/>
      </div>
    </>
  );
}
 
export default PaginaTickets;