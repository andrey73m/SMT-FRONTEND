import Spinner from "@/components/UI/Spinner";
import Servicio from "./Servicio";
import { useServicios } from "@/hooks";

const Servicios = () => {

  const { data,isLoading } = useServicios()
  if (isLoading)
    return(
      <div className="flex h-16 justify-center items-center">
        <Spinner className="h-full" />
      </div>
    )
  return (
    <>
      {
        data?.map((servicio,i) => {
          const esPar = i % 2 === 0
          return <Servicio key={servicio.idtipo_servicio} esPar={esPar} servicio={servicio}/>
        })
      }
    </> );
}
 
export default Servicios;