import SeleccionOrden from "@/components/pages/SeleccionOrden";
import inventarioService from "../../../services/inventarioService";
import TarjetaProducto from "./tarjetaProducto";

import VistaPaginada from "@/components/wrappers/VistaPaginada";
import useQueryPaginacion from "@/hooks/paginacion";
import { DataProducto, TProductoOrdering } from "@/models/DataProducto";
import IconoFlechaScroll from "@/components/icons/FlechasScroll";
import { useNavigate } from "react-router-dom";



const Productos = () => {
  const { queryPaginacion: productosQuery, changeSort } = useQueryPaginacion<DataProducto, TProductoOrdering>("productos", inventarioService.obtenerProductos)
  // if (productosQuery.isLoading) return <SpinnerPagina/>
  const navigate = useNavigate()
  return (
    <div className="flex flex-row">
      <div className="w-80 flex-col border-r-2 border-gray-200 lg:block hidden">

        <SeleccionOrden noSelectionText="Lanzamiento" changeSort={changeSort} options={{
          precio_final: "precio",
          descuento: "descuento",
          disponibilidad: "disponibilidad"
        }}  />
      </div>
      <div className="w-full bg-slate-100">
        <VistaPaginada queryPaginacion={productosQuery}
          containerClassName="w-full py-6 lg:px-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center"
          endContainerClassName="flex flex-col items-center"
          scrollButtonClassName="cursor-pointer rounded-full fixed bottom-2 right-2 bg-purple-700 hover:bg-purple-600 p-2 text-white"
          scrollButtonIcon={<IconoFlechaScroll className="w-7 h-7" />}
          endMessage={<p className="text-sm text-gray-400">Parece que no hay mas datos</p>}
          ListElement={(p) =>

            // <div className="p-8" >
            <div onClick={() => navigate(`/productos/${p.idproducto}`)} key={p.idproducto}>
              <TarjetaProducto className="cursor-pointer hover:shadow-2xl" producto={p}  />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Productos;
