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
    <div className="min-h-screen w-full py-6 lg:px-10 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-100">
      {
        productosQuery.data?.map((producto) =>
          <div className="p-8" key={producto.idproducto}>
            <TarjetaProducto producto={producto} />
          </div>
        )
      }
    </div> );
}

export default Productos;
