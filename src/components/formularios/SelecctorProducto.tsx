import VistaPaginada from "../wrappers/VistaPaginada";
import useQueryPaginacion from "@/hooks/paginacion";
import { DataProducto, TProductoOrdering } from "@/models/DataProducto";
import inventarioService from "@/services/inventarioService";
import IconoFlechaScroll from "../icons/FlechasScroll";
import TarjetaProducto from "../views/inventario/tarjetaProducto";
import cn from "@/cn";
import { ControllerRenderProps, RefCallBack } from "react-hook-form";
import { forwardRef } from "react";
 
const SelectorProducto = forwardRef<RefCallBack, ControllerRenderProps>(({ value, onChange, onBlur }, ref) => {

  const { queryPaginacion: productosQuery } = useQueryPaginacion<DataProducto, TProductoOrdering>("productos", inventarioService.obtenerProductos)

  const ProductoListElement = (p: DataProducto) => {
    const estaSeleccionado = value === p.idproducto

    return (<div onClick={!estaSeleccionado ? () => {
      onChange(p.idproducto)
      onBlur()
    } : undefined} key={p.idproducto}>
      <TarjetaProducto className={cn({ "cursor-pointer hover:shadow-2xl": !estaSeleccionado, "outline outline-4 outline-green-600": estaSeleccionado })} producto={p} />
    </div>)
  }
  return ( <>

    

    <VistaPaginada queryPaginacion={productosQuery}
      containerClassName="w-full py-6 lg:px-10 grid md:grid-cols-2 gap-6 justify-items-center "
      endContainerClassName="flex flex-col items-center"
      scrollButtonClassName="cursor-pointer rounded-full fixed bottom-2 right-2 bg-purple-700 hover:bg-purple-600 p-2 text-white"
      scrollButtonIcon={<IconoFlechaScroll className="w-7 h-7" />}
      endMessage={<p className="text-sm text-gray-400">Parece que no hay mas productos</p>}
      ListElement={ProductoListElement}
    />
    
  </> );
})
 
SelectorProducto.displayName = "SelectorProducto"
export default SelectorProducto;