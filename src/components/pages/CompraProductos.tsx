import { useSearchParams } from "react-router-dom";
import Compra from "../views/compraDeProductos/Compra";
import { DataProducto, DataProductoCompra } from "@/models/DataProducto";
import { useQuery } from "@tanstack/react-query";
import inventarioService from "@/services/inventarioService";
import { useInfoProductos, useProductosCarritoCompras } from "@/hooks";
import { useAppDispatch } from "@/store";
import { setCarritoCompras } from "@/store/features/TopBar";
 
const PaginaCompraProducto = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const idproducto = searchParams.get("idproducto");
  const cantidad = searchParams.get("cantidad")
  const arrayProductos: DataProductoCompra[] = []


  const { data: producto, isFetching } = useQuery<DataProducto>({
    queryKey: ["producto"],
    queryFn: async () => {
      return inventarioService.obtenerProducto(idproducto || "")
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 0
  })

  const { data: productosCarrito, isFetching: isFetchingCarrito } = useInfoProductos()
  const { data: cantidadesProductos } = useProductosCarritoCompras()

  const dispatch = useAppDispatch()

  if (!idproducto !== !cantidad){
    setSearchParams({})
  }
  if (!idproducto && !cantidad){
    dispatch(setCarritoCompras(false))
    if (productosCarrito && cantidadesProductos)
      for (const p of productosCarrito){
        const encontrado = cantidadesProductos.find(pc => pc.idproducto === p.idproducto)
        if (encontrado){
          const { cantidad } = encontrado
          arrayProductos.push({ ...p, cantidad })
        }

      }
  
  }
  
  else if (idproducto && cantidad){
    
    if (producto)
      arrayProductos.push({ ...producto, cantidad: Number(cantidad) })
  }

  const sumaProductos = arrayProductos.reduce((acumulador, productoActual) => acumulador + productoActual.precio * productoActual.cantidad, 0 )

  return (
    <div className="h-full w-full px-4">
      {
        <Compra productos={arrayProductos} total={sumaProductos} isFetching = {idproducto && cantidad ? isFetching : isFetchingCarrito}/>

      }
    </div>
  );
}
 
export default PaginaCompraProducto;