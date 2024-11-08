import { SpinnerPagina, TextoClickable } from "@/components/UI";
import BotonPrimario from "@/components/UI/Botones/BotonPrimario";
import { useEffect, useRef, useState } from "react";
import {  DataProductoCompra } from "@/models/DataProducto";
import { formatoPrecio, notificarError, notificarExito } from "@/utils";
import { useQueryCupones, useQueryDirecciones } from "@/hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DialogoDirecciones from "@/components/pages/DialogoDirecciones";
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import tiendaService from "@/services/tiendaService";
import FormularioDireccion from "@/components/formularios/direccion";
import DialogoCupones from "@/components/pages/DialogoCupones";
import Cupon from "../promociones/cupon";
import { DataCupon } from "@/models/DataPromociones";

interface ResumenCompraProps{
  productos: DataProductoCompra[]
  precio_total: number,
  cantidad?: number,
  descuento?: number
}

interface CompraProps extends ResumenCompraProps{
  isFetching?: boolean
}

interface ConfiguracionesCompraProps {
  cuponesQuery: UseQueryResult<DataCupon[], Error>
}

const ResumenCompra = ({ productos, precio_total, cantidad, descuento }: ResumenCompraProps) => {
  
  const precio_final =
    !descuento !== !cantidad ?
      descuento ?
        Math.round(precio_total * (1 - (descuento / 100))) :
        cantidad ?
          precio_total - cantidad
          : precio_total
      : precio_total

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Resumen de compra</h2>

      {productos.length === 0 && <p className="text-slate-500 text-center">No has agregado productos</p>}
      {productos.map( producto => {
        return (
          <div key={producto.idproducto} className="flex gap-x-2 justify-between items-center">
            <span className="line-clamp-2 w-1/2">{producto.nombre}</span>

            <div className=" flex flex-col py-2 items-end grow">

              <span>1 x {formatoPrecio.format(producto.precio_final)}</span>
              <div className="p-1 w-full border-b-2 border-gray-300" ></div>
              <span>{producto.cantidad} x {formatoPrecio.format(producto.precio_final * producto.cantidad)}</span>
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
        <span>Total</span>
        <span>{formatoPrecio.format(precio_total)}</span>
      </div>

      {!!descuento !== !!cantidad && <div className="flex justify-between text-purple-500">
        <span>Desc.</span>
        {descuento &&
          <span>-{descuento}%</span>}
        {cantidad &&
          <span>{formatoPrecio.format(cantidad)}</span>}
      </div>}
      
      <div className="p-1 h-auto border-b-2 border-gray-300" ></div>
      <div className="flex justify-between font-semibold">
        <span>Pagas</span>
        <span>{formatoPrecio.format(precio_final)}</span>
      </div>
    </>
  )
}


const ConfiguracionesOrden =  ({ cuponesQuery }: ConfiguracionesCompraProps) => {
  const { idusuario } = useParams()
  const { data: direcciones, isSuccess: successDirecciones } = useQueryDirecciones(idusuario);
  const { data: cupones, isSuccess: successCupones } = cuponesQuery;
  const [fechaEntrega, setFechaEntrega] = useState("Mañana");
  const refDialogoDirecciones = useRef<tipoReferencia>(null)
  const refDialogoCupones = useRef<tipoReferencia>(null)

  const [searchParams, setSearchParams] = useSearchParams();
  const iddireccion = searchParams.get("iddireccion");
  const idcupon = searchParams.get("idcupon");
  const direccionSeleccionada = direcciones?.find(direccion => direccion.iddireccion === iddireccion);
  const cuponSeleccionado = cupones?.find(cupon => cupon.idcupon === idcupon);



  useEffect(
    () => {
      configurarComoPredeterminada()
    }
    , [])

  const configurarComoPredeterminada = () => {
    if(iddireccion) return
    if (!direcciones?.length && successDirecciones) refDialogoDirecciones.current?.setMostrarDialogo(true)
    const direccionPredeterminada = direcciones?.find(direccion => direccion.predeterminada);
    if(direccionPredeterminada){
      searchParams.set("iddireccion", direccionPredeterminada.iddireccion)
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    configurarComoPredeterminada()
  }, [direcciones])


  return (
    <>
      <DialogoMostrar ref={refDialogoDirecciones}>
        {
          !direcciones?.length && successDirecciones ?
            <>
              <div className="w-full flex flex-col items-center justify-normal  font-bold text-3xl">
                Parece que aún no has agregado un domicilio
              </div>
              <FormularioDireccion  afterSubmit={() => {
                refDialogoDirecciones.current?.setMostrarDialogo(false)
              }} />
            </>
            :
            <DialogoDirecciones afterSelect={() => refDialogoDirecciones.current?.setMostrarDialogo(false)}/>
        }
      </DialogoMostrar>
      {
        !!cupones?.length && successCupones &&
        <DialogoMostrar ref={refDialogoCupones}>
          <DialogoCupones afterSelect={() => refDialogoCupones.current?.setMostrarDialogo(false)} />
        </DialogoMostrar>
      }
    
      <h2 className="text-2xl font-semibold mb-4">Elige la forma de entrega</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              id="domicilio"
              name="deliveryMethod"
              value="domicilio"
              checked={!!iddireccion}
              onChange={configurarComoPredeterminada}
              className="mr-2"
            />
            <label htmlFor="domicilio" className="font-medium">
                  Enviar a domicilio
            </label>
          </div>
          <span className="text-green-600">Gratis</span>
        </div>
        {iddireccion && (
          <div className="ml-6 mb-4">
            <p className="text-gray-600">{direccionSeleccionada ? direccionSeleccionada.cadena_direccion : "No hay una dirección seleccionada"}</p>
            <TextoClickable onClick={() => refDialogoDirecciones.current?.setMostrarDialogo(true)}
              className="text-purple-500 text-sm mt-1" >Editar o elegir otro domicilio</TextoClickable>
          </div>
        )}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              id="retirar"
              name="deliveryMethod"
              value="retirar"
              checked={!iddireccion}
              onChange={() => {
                if(iddireccion)
                  searchParams.delete("iddireccion", iddireccion)
                setSearchParams(searchParams)
              }
              }
              className="mr-2"
            />
            <label htmlFor="retirar" className="font-medium">
                  Retirar en un punto de entrega
            </label>
          </div>
          <span className="text-green-600">Gratis</span>
        </div>
      </div>
      {
        !!cupones?.length &&
        <>
          <div className="p-5 h-auto border-b-2 border-gray-300" ></div>
          <h2 className="text-2xl font-semibold mb-4">Elige un cupon</h2>
          {
            cuponSeleccionado ?
              <Cupon cupon={cuponSeleccionado}/>
              :
              <p className="text-gray-600">No ha seleccionado un cupón</p>
          }
          <TextoClickable onClick={() => refDialogoCupones.current?.setMostrarDialogo(true)}
            className="text-purple-500 text-sm mt-1" >Seleccionar cupon</TextoClickable>
        </>
      }
      

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

const Compra = ({ productos, precio_total: total, isFetching }: CompraProps) => {

  const [searchParams] = useSearchParams();
  const iddireccion = searchParams.get("iddireccion") || undefined;
  const idcupon = searchParams.get("idcupon") || undefined;
  const queryCupones = useQueryCupones();
  const { data: cupones } = queryCupones
  const cuponSeleccionado = cupones?.find(cupon => cupon.idcupon === idcupon);
  const navigate = useNavigate();
  const generarOrdenMut = useMutation({
    mutationFn: tiendaService.generarOrdenCompra,
    onSuccess: () => {
      navigate("/mis_compras")
      notificarExito("Compra realizada, disfruta tu pedido ;)")
    },
    onError: () => {
      notificarError("No se ha podido tu compra, intenta de nuevo")
    }
  })
  const handleCompra = () => {
    generarOrdenMut.mutate({ productos, iddireccion, idcupon })
  }
  return (
    <div className="flex justify-center items-start lg:p-6 bg-gray-100 min-h-screen">
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:max-w-4xl flex flex-col lg:flex-row">
          <div className="flex flex-col flex-grow pr-6 lg:w-3/5">
            <ConfiguracionesOrden cuponesQuery={queryCupones}/>
          </div>
          <div className="bg-gray-50 rounded-lg mt-2 lg:w-2/5">
            {isFetching ? <SpinnerPagina/> : <ResumenCompra productos={productos} precio_total={total} descuento={cuponSeleccionado?.porcentaje} cantidad={cuponSeleccionado?.cantidad}/>}
          </div>
          
        </div>
        <div className="w-full mt-6 flex justify-end">
          <BotonPrimario onClick={handleCompra} className= "px-4 py-2">
                Comprar
          </BotonPrimario>
        </div>
      </div>
      
    </div>
  )
};


export default Compra;