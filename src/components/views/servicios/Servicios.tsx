import { useQuery } from "@tanstack/react-query";
import servicioService from "../../../services/servicioService";
import Spinner from "../../UI/Spinner";
import cn from "../../../cn";
import ImagenCircular from "../../layout/imagenes/ImagenCircular";
import { DataServicio } from "../../../modelos";



interface ServicioProps{
  servicio: DataServicio;
  esPar: boolean;
}

const Servicio = ({ servicio, esPar }: ServicioProps) => {
  return (
    <div
      className={cn("flex flex-col lg:flex-row w-full items-center p-5 h-auto border-b-2 border-gray-300",{
        "justify-start ":esPar, "lg:flex-row-reverse":!esPar
      })}>
      <ImagenCircular url_imagen={servicio.url_imagen}/>
      <div className={cn("w-full lg:w-3/5",{
        "text-left": esPar, "lg:text-right":!esPar
      })}>
        <h3 className="font-bold text-4xl">{servicio.tipo_servicio}</h3>
        <p className="text-3xl">{servicio.descripcion}</p>
      </div>
    </div>
  )
}

const Servicios = () => {

  const serviciosQuery = useQuery<DataServicio[]>({
    queryKey: ["servicios"],
    queryFn: servicioService.obtenerServicios,
  })
  if (serviciosQuery.isLoading) return <Spinner/>
  return (
    <>
      {
        serviciosQuery.data?.map((servicio,i) => {
          const esPar = i % 2 === 0
          return <Servicio key={servicio.idtipo_servicio} esPar={esPar} servicio={servicio}/>
        })
      }
    </> );
}
 
export default Servicios;