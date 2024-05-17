import { Navigate, useParams } from "react-router-dom";
import Producto from "../views/inventario/Producto";
 
const PaginaDetallesProducto = () => {
  const { idproducto } = useParams()
  
  return (
    <div className="h-full w-full px-4">
      {
        idproducto ?
          <Producto key={idproducto} idproducto={idproducto}/>
          :
          <Navigate to="/productos"/>
      }
    </div>
  );
}
 
export default PaginaDetallesProducto;