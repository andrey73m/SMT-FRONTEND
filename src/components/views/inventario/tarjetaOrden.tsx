import cn from "@/cn";
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar";
import { OrdenCompra, ProductoOrdenCompra } from "@/models/DataOrdenCompra";
import { CapitalizeString, formatoPrecio } from "@/utils";
import { useRef } from "react";

interface TarjetaOrdenProps {
  orden: OrdenCompra
}

interface DetalleProductoProps {
  producto: ProductoOrdenCompra
}

const DetalleProducto = ({ producto } : DetalleProductoProps) => {
  return (
    <div className="flex gap-x-10 px-8 py-5">
      <p className="font-semibold">Img ref: <img className="w-32 p-2 border border-l-gray-400" src={producto.url_imagen}></img></p>
      <p className="flex flex-col font-semibold">Nombre:<span className="font-light">{producto.nombre}</span> </p>
    </div>
  )
}




const TarjetaOrden = ({ orden }: TarjetaOrdenProps) => {
  const referenciaDialogo = useRef<tipoReferencia>(null)

  const tagEstadoPedido = () => {
    const estadoCapital = CapitalizeString(orden.estado)
    return (
      <div className={cn("flex my-2 p-1 px-2 py-1 rounded-full justify-center items-center text-white", {
        "bg-sky-600": orden.estado === "enviado",
        "bg-yellow-400": orden.estado === "pedido",
        "bg-violet-800": orden.estado === "recibido"
      })}>
        <div className="font-bold">
          {estadoCapital}
        </div>
      </div>
    )
  }


  return(
    <>
      <DialogoMostrar ref={referenciaDialogo}>
        <div className="w-full flex flex-col items-center font-bold text-3xl">
                Detalles Orden
          <p className="mt-3 font-light text-lg text-gray-500">ID: {orden.idorden}</p>
        </div>
        
        <div className="max-h-[38rem] overflow-y-auto scroll-secundario">
          <table className="table-auto border-separate border-spacing-7 text-center">
            <thead>
              <tr>
                <th className="font-semibold">Imagen</th>
                <th className="font-semibold">Nombre</th>
                <th className="font-semibold" >Cantidad</th>
                <th className="font-semibold">Precio Unidad</th>
              </tr>
            </thead>
            <tbody>

              {orden.productos.map((producto) =>
                <tr key={producto.idproducto} className="*:p-2 ">
                  <td><img className="w-28 p-2 border border-l-gray-400" src={producto.url_imagen}></img></td>
                  <td className="font-light line-clamp-3 w-72">{producto.nombre}</td>
                  <td className="font-light h-20">{producto.cantidad}</td>
                  <td className="font-light">{formatoPrecio.format(producto.costo)} </td>
 
                </tr>
              )}

            </tbody>
          </table>
        </div>

        <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
        <div className="w-full flex justify-between px-10">
          <p className="font-bold">Precio Total: </p>
          
          <span className="font-light text-red-700">{formatoPrecio.format(orden.costo_total)}</span>
        </div>
        <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
        <div className="w-full flex justify-between px-10">
          <p className="font-bold">Precio Final: </p>
          
          <span className="font-light text-red-700">{formatoPrecio.format(orden.costo_final)}</span>
        </div>
        
      </DialogoMostrar>


      <div className="px-3 py-10 rounded-xl shadow-md cursor-pointer hover:shadow-2xl bg-white " onClick={() => referenciaDialogo.current?.setMostrarDialogo(true)}>
        <div className="flex justify-between w-full">
          <p className="font-bold text-2xl m-2">Identificador: <span className="font-light">{orden.idorden}</span> </p>
          {tagEstadoPedido()}
        </div>
        <p className="font-bold text-2xl m-2">Fecha: <span className="font-light">{new Date (orden.fecha_orden).toLocaleString(undefined, {})}</span></p>
        <p className="font-bold text-2xl m-2">Costo total: <span className="font-light">{formatoPrecio.format(orden.costo_total)}</span></p>
        <p className="font-bold text-2xl m-2">Costo final: <span className="font-light">{formatoPrecio.format(orden.costo_final)}</span></p>

        <div className="p-6 *:leading-10 ">
          <h5 className="font-bold text-2xl m-2">Productos:</h5>
          <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
          {orden.productos.map((producto) => <DetalleProducto key={producto.idproducto} producto={producto}/>
            
          )}

        </div>
      </div>
    </>
  )

  
}

export default TarjetaOrden;