import cn from "@/cn";
import FormularioOferta from "@/components/formularios/oferta";
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar";
import VistaPaginada from "@/components/wrappers/VistaPaginada";
import { useInfoProducto } from "@/hooks/inventario";
import useQueryPaginacion from "@/hooks/paginacion";
import { DataOferta } from "@/models/DataPromociones";
import promocionService from "@/services/promocionService";
import timeService from "@/services/timeService";
import { useRef, useState } from "react";

interface TarjetaOfertaProps extends React.HTMLAttributes<HTMLDivElement> {
  oferta: DataOferta
  fecha_actual: Date
  
}

// interface VistaOfertasProps {}

const TarjetaOferta = ({ oferta, fecha_actual, className, ...props }: TarjetaOfertaProps) => {
  const { data } = useInfoProducto(oferta.idcategoria, oferta.idproducto)

  const fecha_inicio = new Date(oferta.fecha_inicio)
  const fecha_fin = new Date(oferta.fecha_fin)
  
  const fecha = fecha_actual < fecha_inicio ?
    `Starts ${timeService.convertirFechaEnIntervalo(fecha_inicio)}`
    :
    fecha_actual < fecha_fin ?
      `Ends ${timeService.convertirFechaEnIntervalo(fecha_fin)}`
      :
      `Finished ${timeService.convertirFechaEnIntervalo(fecha_fin)}`

  return (
    <div {...props} className={cn("cursor-pointer hover:border-purple-700 hover:shadow-violet-900 shadow-md border-2 rounded-md p-5 transition-colors duration-300",className)}>
      <header className="mb-2 border-b-2 pb-4">
        <div className="flex justify-between items-center">

          <main>

            <h3 className="font-bold text-lg">{oferta.asunto}</h3>
            <p>{oferta.descripcion}</p>
          </main>
          <aside className="">
            <span className="w-80 p-2 text-center align-middle text-3xl text-purple-600">-{oferta.porcentaje}%</span>

          </aside>
        </div>
        <section className="font-semibold text-end w-full flex justify-end mt-2 *:w-1/3 *:text-ellipsis *:line-clamp-2">

          {
            data &&
            <>
              {data.categoria &&
              <p>En la categoría: {data.categoria.denominacion}</p>
              }
              {data.producto &&
              <p>En el producto: {data.producto.nombre}</p>
              }
            </>
          }
        </section>
      </header>
      
      <footer className="flex justify-between">
        <p className="font-semibold">{new Date(fecha_inicio).toLocaleDateString()} - {new Date(fecha_fin).toLocaleDateString()}</p>

        <p className="text-gray-500 font-semibold">{fecha}</p>
      </footer>
    </div>
  )
}

const VistaOfertas = () => {

  const { queryPaginacion } = useQueryPaginacion("ofertas", promocionService.obtenerOfertas)
  const fecha_actual = new Date()
  const refDialogo = useRef<tipoReferencia>(null)
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState<DataOferta>()
  return (
    <div className="w-full p-7">
      <DialogoMostrar ref = {refDialogo} className="max-h-full overflow-y-auto">
        {
          ofertaSeleccionada &&
          <FormularioOferta modoActualizar oferta={ofertaSeleccionada} afterSubmit={() => {
            refDialogo.current?.setMostrarDialogo(false)
            queryPaginacion.refetch()
          }}/>
        }
      </DialogoMostrar>
      <VistaPaginada
        containerClassName="flex flex-col gap-y-5"
        endContainerClassName="flex justify-center flex-col items-center text-gray-400 font-semibold my-2"
        endMessage="Parece que no hay mas ofertas"
        queryPaginacion={queryPaginacion}
        ListElement={o =>
          <TarjetaOferta oferta={o} key={o.idoferta} fecha_actual={fecha_actual} onClick = {() => {
            refDialogo.current?.setMostrarDialogo(true)
            setOfertaSeleccionada(o)
          }}/>
        }

      />
    </div>
  );
}
 
export default VistaOfertas;