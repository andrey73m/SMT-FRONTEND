
import FormularioOferta from "../formularios/oferta";
import AlternarFormulario from "../layout/AlternarFormulario";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { BotonPrimario } from "../UI/Botones";
import VistaOfertas from "../views/promociones/ofertas";

const PaginaOfertas = () => {
  return (
    <>
      <ImagenTitulo titulo="Gestión Ofertas" urlImagen="https://elblogddd.org/wp-content/uploads/2015/07/oferta.jpg" />
      <div className="flex justify-center ">
        <AlternarFormulario texto="Agrega una dirección" Formulario={FormularioOferta} Boton={BotonPrimario} />
      </div>
      <VistaOfertas/>
    </>
  )

}

export default PaginaOfertas;