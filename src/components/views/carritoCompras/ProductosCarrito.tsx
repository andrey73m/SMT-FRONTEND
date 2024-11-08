import cn from "@/cn";
import {  useDataProductosFiltrado, useEstadoCarritoCompras, useInfoProductos, useMutacionesCarrito } from "@/hooks/carritoCompras";
import { DataProducto } from "@/models/DataProducto";
import { useAppDispatch } from "@/store";
import { setCarritoCompras } from "@/store/features/TopBar";
import { formatoPrecio } from "@/utils";
import { MouseEventHandler, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconoSimboloX from "@/components/icons/SimboloX";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
import { BotonPrimario } from "@/components/UI/Botones";

interface InfoProductosCarritoProps{
  producto: DataProducto
}
 


const InfoProductosCarrito = ({ producto }: InfoProductosCarritoProps) => {
  const productoEnCarrito = useDataProductosFiltrado(producto.idproducto)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { mutacionQuitar } = useMutacionesCarrito()
  

  const handleNavigate: MouseEventHandler<HTMLDivElement> = () => {
    navigate(`/productos/${producto.idproducto}`)
    dispatch(setCarritoCompras(false))
  }
  const handleDelete = () => {
    mutacionQuitar.mutate(producto.idproducto)
  }
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)

  return productoEnCarrito && (

    <div  className="border-b-2 py-3 hover:bg-slate-200 cursor-pointer">
      <DialogoConfirmar ejecutarAccion={handleDelete} titulo="¿Estás seguro de eliminar este producto?" ref= {referenciaConfirmacion}/>

      <div className="flex justify-end px-2">
        <span className="rounded-full cursor-pointer text-2xl hover:font-bold h-6 w-6 hover:text-red-700 transition-all"
          onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)}>
          <IconoSimboloX/>
        </span>
      </div>
      <div onClick={handleNavigate}  className="flex w-full gap-x-2 p-2">
        <div  className="h-24 min-w-24 border-2 border-slate-100 border-dashed p-2">

          <div className="bg-image bg-contain  bg-center bg-no-repeat h-full w-full" style={{ backgroundImage: `url('${producto.url_imagen}')` }}/>
        </div>
        <div className="text-start">
          <h4 className="text-xl font-bold line-clamp-2">{producto.nombre}</h4>
          <p>{producto.marca} - {formatoPrecio.format(producto.precio)}</p>

          <p>Cantidad: {productoEnCarrito.cantidad}</p>
        </div>
      </div>
      

    </div>
  )
}

const ProductosCarrito = () => {
  const { abierto } = useEstadoCarritoCompras()
  const dispatch = useAppDispatch()
  const { data: infoProductos, isSuccess, refetch } = useInfoProductos();
  useEffect(() => {
    refetch()
  },[abierto])

  const botonDeshabilitado = !infoProductos?.length
  return (
    <>
      <div
        onClick={() => dispatch(setCarritoCompras(false))}
        className={cn(" bg-gray-600/50 h-screen w-screen fixed top-0 right-0 backdrop-blur-sm transition-all z-50", {
          "hidden": !abierto
        })} />

      <div className={cn("bg-white flex flex-col top-0 h-full w-72 sm:w-96 fixed transition-all duration-100 z-50", {
        "right-0": abierto,
        "-right-96": !abierto
      })}>


        <div className="mb-2 p-2 bg-slate-100">

          <h3 className="text-2xl font-bold text-center ">Tu carrito</h3>
        </div>

        <div className="grow flex flex-col text-center overflow-y-auto scroll-secundario">

          {
            isSuccess &&
          infoProductos.map((producto) =>
            <InfoProductosCarrito key={producto.idproducto} producto={producto}/>
          )
          }

        </div>
        <div className="bg-white p-3">
          <Link to={botonDeshabilitado ? "" : "/carrito/comprando"}>
            <BotonPrimario disabled={botonDeshabilitado} className="w-full rounded-lg">Ir al carrito</BotonPrimario>
          </Link>
        </div>
      </div>
    </>
  );
}
 
export default ProductosCarrito;