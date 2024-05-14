import { useQuery } from "@tanstack/react-query";
import inventarioService from "../../../services/inventarioService";
import Spinner from "../../UI/Spinner";
import TarjetaProducto from "./tarjetaProducto";
import { DataProducto } from "@/models/DataProducto";



const Productos = () => {
  const productosQuery = useQuery<DataProducto[]>({
    queryKey: ["productos"],
    queryFn: inventarioService.obtenerProductos,
  })
  if (productosQuery.isLoading) return <Spinner/>
  
  return (
    <>
      {
        productosQuery.data?.map((producto) =>
          <div className="p-8" key={producto.idproducto}>
            <TarjetaProducto producto={producto} />
          </div>
        )
      }
    </> );
}

export default Productos;
