import { useQuery } from "@tanstack/react-query";
import servicioService from "../../../services/servicioService";
import Spinner from "../../UI/Spinner";

interface DataServicio{
  idservicio: number,
  tipo_servicio: string,
  descripcion: string,
  url_imagen: string
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
        serviciosQuery.data?.map((servicio,i) =>

          <div key={servicio.idservicio} className={`flex w-full items-center p-5 h-auto border-b-2 border-gray-300 ${i % 2 === 0 ? "justify-start " : "flex-row-reverse"}`}>
            <div className="rounded-full h-80 w-80 bg-image bg-center mx-12" style={{ backgroundImage: `url('${servicio.url_imagen}')` }}>

            </div>
            <div className={`w-full md:w-3/5 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
              <h3 className="font-bold text-4xl">{servicio.tipo_servicio}</h3>
              <p className="text-3xl">{servicio.descripcion}</p>
            </div>
          </div>
        )
      }
    </> );
}
 
export default Servicios;