import FormularioRAEE from "../formularios/raee";
import AlternarFormularioSticky from "../layout/AlternarFormularioSticky";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { BotonPositivo } from "../UI/Botones";
import ListaRAEE from "../views/ambiental/ListaRAEE";

const PaginaRAEE = () => {
  return(
    <>
      <ImagenTitulo titulo="Disposición de RAEE" urlImagen="https://ecocomputo.com/wp-content/uploads/2025/09/que-hacer-con-los-raee-en-colombia-banda-transporte-operarios.jpg"/>
      <AlternarFormularioSticky texto="¿Tienes aparatos eléctricos o electrónicos viejos y no sabes como desecharlos correctamente?" Formulario={FormularioRAEE} Boton={BotonPositivo}/>
      <ListaRAEE/>      
    </>
  )
}

export default PaginaRAEE;