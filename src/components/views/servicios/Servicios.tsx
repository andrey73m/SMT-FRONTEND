import { useQuery } from "@tanstack/react-query";
import servicioService from "@/services/servicioService";
import Spinner from "@/components/UI/Spinner";
import { DataServicio } from "@/models";
import Servicio from "./Servicio";

const Servicios = () => {

  const serviciosQuery = useQuery<DataServicio[]>({
    queryKey: ["servicios"],
    queryFn: servicioService.obtenerServicios,
    refetchOnWindowFocus:false
  })
  if (serviciosQuery.isLoading)
    return(
      <div className="flex h-16 justify-center items-center">
        <Spinner className="h-full" />
      </div>
    )
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