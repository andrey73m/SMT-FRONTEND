import inventarioService from "@/services/inventarioService"
import { DataProducto } from "@/models/DataProducto"
import { useQuery } from "@tanstack/react-query"
import { SpinnerPagina } from "@/components/UI"
import Especificaciones from "./Especificaciones"
import { CapitalizeString, formatoPrecio } from "@/utils"
import BotonAterior from "@/components/layout/BotonAnterior"
import { BotonPositivo, BotonSecundario } from "@/components/UI/Botones"
import Boton from "@/components/UI/Botones/Boton"
import { VistaRol } from "@/components/wrappers"
import useTituloPagina from "@/hooks/TituloPagina"
import { useEffect } from "react"

interface ProductoProps {
  idproducto: string
}
 
const Producto = ({ idproducto }: ProductoProps) => {
  const setTitulo = useTituloPagina()
  const { data: producto, isFetching, isSuccess, ...productoQuery } = useQuery<DataProducto>({
    queryKey: ["producto"],
    queryFn: async () => inventarioService.obtenerProducto(idproducto),
    retry: 0,
    refetchOnWindowFocus: false
  })
  useEffect(() => {
    if (producto){
      setTitulo(producto.nombre, true)
    }
  }, [producto])
  if (isFetching) return <SpinnerPagina/>
  console.log(producto)
  return (
    <>
      {
        isSuccess &&
        <div className=" w-full h-full">
          <div className="h-auto sticky top-topbar bg-white z-40">

            <BotonAterior className="w-8 z-50" defaultPath="/productos"/>
          </div>
          <div className="flex items-center gap-x-4 h-[30rem] border-b-2 border-gray-200 py-2 z-30">
            <div className="w-[50rem] h-full  content-center bg-white z-10">
              <img className=" object-contain max-h-full w-full rounded-md" src={producto.url_imagen} alt="" />
            </div>
            <div className="border-r-2 border-gray-200 h-full"/>
            <div className="flex grow pr-3 py-2 flex-col gap-y-2 h-[30rem] text-lg justify-between">
              <div>

                <p className="text-end text-slate-400">SKU: {producto.sku}</p>
                <p>Marca <b>{CapitalizeString(producto.marca)}</b></p>
                <h2 className="font-bold text-2xl">{producto.nombre}</h2>
                <p className="text-3xl">{formatoPrecio.format(producto.precio)}</p>
                <p className="text-xl text-gray-400">{producto.descripcion}</p>
              </div>
              <div className="*:p-3 text-2xl font-bold flex flex-col gap-y-2">
                <VistaRol roles={["cliente"]} permitirSinAutenticar esperarRol={false}>
                  <BotonPositivo >Agregar al carrito</BotonPositivo>
                  <Boton className="bg-amber-400 hover:bg-amber-300">Comprar ahora</Boton>
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