import { BotonPrimario } from "../UI/Botones";
import FormularioInventario from "../formularios/inventario";
import AlternarFormulario from "../layout/AlternarFormulario";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import Productos from "../views/inventario/vistaProductos";
import { VistaRol } from "../wrappers";

const PaginaProductos = () => {
  return (
    <>
      <ImagenTitulo titulo="Nuestros Productos" urlImagen="https://estaticos.elcolombiano.com/documents/10157/0/580x365/0c0/0d0/none/11101/DNMT/image_content_31335055_20180629185454.jpg"/>
      <VistaRol roles={["admin"]}>
        <AlternarFormulario claseMostrar="fixed sm:pt-topbar max-h-dvh z-50" className="transition-all z-10" texto="Agrega un nuevo producto" Formulario={FormularioInventario} Boton={BotonPrimario}/>
      </VistaRol>
      <Productos />
      
    </>
  );
}
 
export default PaginaProductos;