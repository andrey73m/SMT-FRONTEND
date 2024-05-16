import cn from "@/cn";
import { SpinnerPagina } from "@/components/UI";
import { DataEspecificacionesProducto } from "@/models/DataProducto";
import inventarioService from "@/services/inventarioService";
import { CapitalizeString } from "@/utils";
import { useQuery } from "@tanstack/react-query";

interface EspecificacionesProps {
  idcomponente: string
}

const Especificaciones = ({ idcomponente }: EspecificacionesProps) => {
  const { data: especificaciones, isFetching, isSuccess, ...especificacionesQuery } = useQuery<DataEspecificacionesProducto[]>({
    queryKey: ["especificaciones-producto"],
    queryFn: async () => inventarioService.obtenerEspecificacionesProducto(idcomponente),
    retry: 0,
    refetchOnWindowFocus: false
  })
  if (isFetching) return <SpinnerPagina />
  console.log(especificaciones)
  return isSuccess && (
    
    <div className=" lg:text-xl w-full border-t-2 my-2">
      {
        <table className="w-full border-spacing-3 ">
          <tbody>
            {
              especificaciones.map((spec,i) =>
                <tr key={spec.idcat_espec} className={cn({ "bg-slate-100":i % 2 === 0 })}>
                  <td className="p-4"><b>{CapitalizeString(spec.atributo)}</b></td>
                  <td>{spec.valor}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      }
    </div>
  );
}

export default Especificaciones;