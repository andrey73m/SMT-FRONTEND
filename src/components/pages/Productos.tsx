import { ImagenTitulo } from "../layout/FormatoImagenes";
import Productos from "../views/inventario/vistaProductos";

const PaginaProductos = () => {
  return (
    <>
      <ImagenTitulo titulo="Nuestros Productos" urlImagen="https://estaticos.elcolombiano.com/documents/10157/0/580x365/0c0/0d0/none/11101/DNMT/image_content_31335055_20180629185454.jpg"/>
      <div className="min-h-screen py-6 px-10 lg:grid grid-cols-3 gap-6 bg-slate-100">
        <Productos />
      </div>
    </>
  );
}
 
export default PaginaProductos;