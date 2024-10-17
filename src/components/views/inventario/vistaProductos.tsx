import SeleccionOrden from "@/components/pages/SeleccionOrden";
import inventarioService from "../../../services/inventarioService";
import TarjetaProducto from "./tarjetaProducto";

import VistaPaginada from "@/components/wrappers/VistaPaginada";
import useQueryPaginacion from "@/hooks/paginacion";
import { DataProducto, productoOrdering, TProductoOrdering } from "@/models/DataProducto";



const Productos = () => {
  const { queryPaginacion: productosQuery, changeSort } = useQueryPaginacion<DataProducto, TProductoOrdering>("productos", inventarioService.obtenerProductos)
  // if (productosQuery.isLoading) return <SpinnerPagina/>
  
  return (
    <div className="flex flex-row">
      <div className="w-80 flex-col border-r-2 border-gray-200 lg:block hidden">

        <SeleccionOrden defaultSelected="precio" noSelectionText="Fecha" changeSort={changeSort} options={productoOrdering} />
      </div>
      <div className="w-full">
        <VistaPaginada queryPaginacion={productosQuery}
          containerClassName="min-h-screen w-full py-6 lg:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 bg-slate-100 justify-items-center"

          ListElement={(p) =>

            // <div className="p-8" >
            <TarjetaProducto producto={p} key={p.idproducto} />
            // </div>
          }
        />
      </div>
    </div>
  );
}

export default Productos;
