import { ImagenTitulo } from "../layout/FormatoImagenes";
import Ordenes from "../views/inventario/vistaOrdenes";

const PaginaMisCompras = () => {
  return(
    <>
      <ImagenTitulo titulo="Tus Compras" urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoHYxVjwYJ03Pec7stZRUBksEVNPQ83WWzQ&s"/>
      <Ordenes/>
    </>
  )
}

export default PaginaMisCompras;