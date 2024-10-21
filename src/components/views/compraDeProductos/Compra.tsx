import { SpinnerPagina, TextoClickable } from "@/components/UI";
import BotonPrimario from "@/components/UI/Botones/BotonPrimario";
import { useState } from "react";
import Direcciones from "../direcciones/VistaDirecciones";
import {  DataProductoCompra } from "@/models/DataProducto";
import { formatoPrecio } from "@/utils";




interface ResumenCompraProps{
  productos: DataProductoCompra[]
  total: number
}

interface CompraProps extends ResumenCompraProps{
  isFetching?: boolean
}

const ResumenCompra = ({ productos, total }: ResumenCompraProps) => {
  return (

    <>
      <h2 className="text-2xl font-semibold mb-4">Resumen de compra</h2>

      {productos.length === 0 && <p className="text-slate-500 text-center">No has agregado productos</p>}
      {productos.map( producto => {
        return (
          <div key={producto.idproducto} className="flex gap-x-2 justify-between items-center">
            <span className="line-clamp-2 w-1/2">{producto.nombre}</span>

            <div className=" flex flex-col py-2 items-end grow">

              <span>1 x {formatoPrecio.format(producto.precio)}</span>
              <div className="p-1 w-full border-b-2 border-gray-300" ></div>
              <span>{producto.cantidad} x {formatoPrecio.format(producto.precio * producto.cantidad)}</span>
            </div>

        
          </div>)
      })}

      <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
      <div className="flex justify-between mb-4">
        <span>Envío</span>
        <span>0 COP</span>
      </div>
      <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
      <div className="flex justify-between font-semibold">
        <span>Pagas</span>
        <span>{formatoPrecio.format(total)}</span>
      </div>
    </>
  )
}

const ConfiguracionesOrden =  () => {
  const [opcionEntrega, setOpcionEntrega] = useState("domicilio");
  const [fechaEntrega, setFechaEntrega] = useState("Mañana");
  const direcciones = () => {
    <Direcciones></Direcciones>
  }
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Elige la forma de entrega</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              id="domicilio"
              name="deliveryMethod"
              value="domicilio"
              checked={opcionEntrega === "domicilio"}
              onChange={() => setOpcionEntrega("domicilio")}
              className="mr-2"
            />
            <label htmlFor="domicilio" className="font-medium">
                  Enviar a domicilio
            </label>
          </div>
          <span className="text-green-600">Gratis</span>
        </div>
        {opcionEntrega === "domicilio" && (
          <div className="ml-6 mb-4">
            <p className="text-gray-600">Calle 16 #24-18</p>
            <TextoClickable className="text-purple-500 text-sm mt-1" onClick={direcciones}>Editar o elegir otro domicilio</TextoClickable>
          </div>
        )}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              id="retirar"
              name="deliveryMethod"
              value="retirar"
              checked={opcionEntrega === "retirar"}
              onChange={() => setOpcionEntrega("retirar")}
              className="mr-2"
            />
            <label htmlFor="retirar" className="font-medium">
                  Retirar en un punto de entrega
            </label>
          </div>
          <span className="text-green-600">Gratis</span>
        </div>
      </div>

      <div className="p-5 h-auto border-b-2 border-gray-300" ></div>
      
      <div className="mt-5 grow">
            
        <h2 className="text-2xl font-semibold mb-4">Revisa cuándo llega tu compra</h2>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fecha"
              name="deliveryMethod"
              value="fecha"
              checked={fechaEntrega === "Mañana"}
              onChange={() => setFechaEntrega("Mañana")}
              className="mr-2"
            />
            <label htmlFor="fecha" className="font-normal">
              <span className="font-semibold">Miércoles</span> - Única opción disponible
            </label>
          </div>
          <span className="text-green-600">Gratis</span>
        </div>
      </div>

      
      
    </>

  )
}

const Compra = ({ productos, total, isFetching }: CompraProps) => {
  
  



  return (
    <div className="flex justify-center items-start lg:p-6 bg-gray-100 min-h-screen">
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:max-w-4xl flex flex-col lg:flex-row">
          <div className="flex flex-col flex-grow pr-6 lg:w-3/5">
            <ConfiguracionesOrden/>
          </div>
          <div className="bg-gray-50 rounded-lg mt-2 lg:w-2/5">
            {isFetching ? <SpinnerPagina/> : <ResumenCompra productos={productos} total={total}/>}
          </div>
          
        </div>
        <div className="w-full mt-6 flex justify-end">
          <BotonPrimario className= "px-4 py-2">
                Continuar
          </BotonPrimario>
        </div>
      </div>
      
    </div>
  )
};


export default Compra;