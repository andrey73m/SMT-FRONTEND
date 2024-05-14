import { Navigate, useParams } from "react-router-dom";
import Producto from "../views/inventario/Producto";

interface PaginaDetallesProductoProps {
  
}
 
const PaginaDetallesProducto = () => {
  const { idproducto } = useParams()
  return (
    <div className="h-full w-full p-4">
      {
        idproducto ?
          <Producto idproducto={idproducto}/>
          :
          <Navigate to="/productos"/>
      }
    </div>
  );
}
 
export default PaginaDetallesProducto;