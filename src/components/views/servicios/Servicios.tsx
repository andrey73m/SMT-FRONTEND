import { useQuery } from "@tanstack/react-query";
import servicioService from "../../../services/servicioService";
import Spinner from "../../UI/Spinner";

interface DataServicio{
  idservicio: number,
  tipo_servicio: string,
  descripcion: string
}


interface ServiciosProps {
  
}
 
const Servicios = (props: ServiciosProps) => {

  const serviciosQuery = useQuery<DataServicio[]>({
    queryKey: ["servicios"],
    queryFn: servicioService.obtenerServicios,
  })
  if (serviciosQuery.isLoading) return <Spinner/>
  return (
    <>
      {
        serviciosQuery.data?.map(servicio =>
          <div key={servicio.idservicio} className="w-full p-5 h-auto border-2 border-gray-300 ">
            <h3 className="font-bold text-3xl">{servicio.tipo_servicio}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        )
      }
    </> );
}
 
export default Servicios;