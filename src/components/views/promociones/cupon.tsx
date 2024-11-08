import { DataCupon } from "@/models/DataPromociones";
import BotonSeleccionar from "@/components/layout/general/BotonSeleccionar";
import { useSearchParams } from "react-router-dom";
import { formatoPrecio } from "@/utils";
interface CuponProps {
  cupon: DataCupon
  modoCompra?: boolean
  afterSelect?: () => void
}

const Cupon = ({ cupon, modoCompra, afterSelect }: CuponProps) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const idcupon = searchParams.get("idcupon");
  console.log(Object.fromEntries(searchParams.entries()))


  const handleCheck = async () => {
    searchParams.set("idcupon", cupon.idcupon)
    setSearchParams(searchParams)
    if (afterSelect)
      afterSelect()
  }

  return (
    <>
      <div className="rounded-xl bg-white w-auto">
        {modoCompra && <div className="flex justify-end h-0">
          <div className="my-5 mx-2 flex justify-end h-10">
            <BotonSeleccionar onClick={cupon.usado || cupon.expirado ? undefined : handleCheck } seleccionado={!cupon.usado && (idcupon === cupon.idcupon)}
              deshabilitado={cupon.usado || cupon.expirado}
            />
          </div>
        </div>}
        <div className="p-2 px-3 *:leading-10 border-2 rounded-md">
          <span className="text-purple-400">

            { cupon.porcentaje ?
              <p className="pl-4 pt-2 text-5xl md:text-7xl">-{cupon.porcentaje}%</p>
              :
              <p className="pt-2 text-5xl md:text-7xl">{formatoPrecio.format(cupon.cantidad)}</p>
            }
          </span>
          <h6 className="font-medium text-2xl pt-4">{cupon.asunto}</h6>
          <div className="flex flex-col justify-between items-end">
            <p className="text-xl w-full">{cupon.descripcion}</p>
            <p className="text-lg font-semibold text-red-950">Válido {cupon.duracion} días</p>
          </div>


        </div>
      </div>
    </>

  )

}

export default Cupon;