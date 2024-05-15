import { useQuery } from "@tanstack/react-query";
import inventarioService from "../../../services/inventarioService";
import TarjetaProducto from "./tarjetaProducto";
import { DataProducto } from "@/models/DataProducto";
import { SpinnerPagina } from "@/components/UI";



const Productos = () => {
  const productosQuery = useQuery<DataProducto[]>({
    queryKey: ["productos"],
    queryFn: inventarioService.obtenerProductos,
    refetchOnWindowFocus: false,
  })
  if (productosQuery.isLoading) return <SpinnerPagina/>
  
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
