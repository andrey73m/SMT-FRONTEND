import inventarioService from "@/services/inventarioService"
import { DataProducto } from "@/models/DataProducto"
import { useQuery } from "@tanstack/react-query"
import { SpinnerPagina } from "@/components/UI"
import Especificaciones from "./Especificaciones"
import { CapitalizeString, formatoPrecio } from "@/utils"
import BotonAterior from "@/components/layout/BotonAnterior"
import { BotonNegativo, BotonPositivo, BotonSecundario } from "@/components/UI/Botones"
import { VistaRol } from "@/components/wrappers"
import useTituloPagina from "@/hooks/TituloPagina"
import { useEffect, useRef } from "react"
import CampoContador from "@/components/UI/CampoContador"
import { useDataProductosFiltrado, useMutacionesCarrito } from "@/hooks/carritoCompras"
import { Media } from "@/MediaConfig"
import { useSesion } from "@/hooks"
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar"

interface ProductoProps {
  idproducto: string
}
 
const Producto = ({ idproducto }: ProductoProps) => {
  const setTitulo = useTituloPagina()
  const { haySesion } = useSesion()
  const { mutacionAgregarACarrito, mutacionQuitar } = useMutacionesCarrito()
  const productoEnCarrito = useDataProductosFiltrado(idproducto);
  const { data: producto, isFetching, isSuccess, ...productoQuery } = useQuery<DataProducto>({
    queryKey: ["producto"],
    queryFn: async () => {
      console.log("BUSCANDO EL PRODUCTO")
      return inventarioService.obtenerProducto(idproducto)
    },
    retry: 0,
    refetchOnWindowFocus: false
  })
  const refCantidad = useRef<HTMLInputElement>(null);

  
  const clickAgregar = () => {
    const cantidad = Number(refCantidad.current?.value)
    if (cantidad)
      mutacionAgregarACarrito.mutate({ idproducto, cantidad })
  }

  const handleDelete = () => {
    if(producto)
      mutacionQuitar.mutate(producto.idproducto)
  }

  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>()


  useEffect(() => {
    if (producto){
      setTitulo(producto.nombre, true)
    }
  }, [producto])
  if (isFetching) return <SpinnerPagina/>
  return (
    <>
      {
        isSuccess &&
        <div className=" w-full h-full">
          <DialogoConfirmar ejecutarAccion={handleDelete} titulo="¿Estás seguro de eliminar este producto?" ref= {referenciaConfirmacion}/>

          <div className="h-auto p-2 sticky top-topbar bg-white z-40 shadow-sm">

            <BotonAterior className="w-8 z-50" defaultPath="/productos"/>
          </div>
          <div className="flex  flex-col lg:flex-row items-center gap-x-4 lg:h-[30rem] border-b-2 border-gray-200 py-2 z-30">
            <Media lessThan="lg">
              <p className="text-end text-slate-400">SKU: {producto.sku}</p>

            </Media>
            <div className="w-full shrink-0 p-4 md:p-10 lg:p-0 transition-all lg:w-1/2 h-full  content-center bg-white z-10">
              <img className=" object-contain max-h-full w-full rounded-md" src={producto.url_imagen} alt="" />
            </div>
            <div className="border-r-2 border-gray-200 h-full"/>
            <div className="flex grow pr-3 py-2 flex-col-reverse lg:flex-col gap-y-2 h-[30rem] text-lg justify-between">
              <div>
                <Media greaterThan="lg">
                  <p className="text-end text-slate-400">SKU: {producto.sku}</p>

                </Media>
                <p>Marca <b>{CapitalizeString(producto.marca)}</b></p>
                <h2 className="font-bold text-2xl">{producto.nombre}</h2>
                <p className="text-3xl">{formatoPrecio.format(producto.precio)}</p>
                <p className="text-xl text-gray-600">Quedan: {producto.disponibilidad} {productoEnCarrito && `(${productoEnCarrito.cantidad} en el carrito)`}</p>
                <p className="text-xl text-gray-400 line-clamp-3 py-1">{producto.descripcion}</p>
              </div>
              {
                !haySesion &&
                  <div className="grow flex justify-center items-center text-center align-baseline">
                    <p>Inicia de sesión para comprar</p>
                  </div>
              }
              <div className="text-xl font-bold flex flex-col gap-y-2">
                <VistaRol roles={["cliente"]}>
                  <div className="flex justify-center items-end h-auto gap-x-2">

                    <CampoContador  initial={1} ref={refCantidad} label="Cantidad" min={1} max={producto.disponibilidad}/>
                    {
                      productoEnCarrito &&
                        <BotonNegativo onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)} className="h-12">Eliminar del carrito</BotonNegativo>
                    }
                  </div>

                  <BotonPositivo onClick={clickAgregar}>Agregar al carrito</BotonPositivo>
                  <BotonSecundario>Comprar ahora</BotonSecundario>
                </VistaRol>
                
                <VistaRol roles={["admin"]}>
                  <BotonSecundario>Editar</BotonSecundario>
                </VistaRol>
              </div>
            </div>
          
          </div>
          <h3 className="font-bold text-3xl pt-10">Especificaciones</h3>

          <Especificaciones idcomponente={producto?.idcomponente}/>
        </div>
      }
    </>
  );
}
 
export default Producto;