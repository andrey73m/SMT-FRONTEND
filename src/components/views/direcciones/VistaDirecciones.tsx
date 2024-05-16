import direccionesService from "@/services/direccionesService";
import { SpinnerPagina } from "@/components/UI";
import DataDireccion from "@/models/DataDireccion";
import { useQuery } from "@tanstack/react-query";
import Direccion from "./Direccion";
import { BotonPrimario } from "@/components/UI/Botones";
import { useNavigate } from "react-router-dom";


const Direcciones = () => {

  const navigate = useNavigate()

  const direccionesQuery = useQuery<DataDireccion[]>({
    queryKey: ["direcciones"],
    queryFn: direccionesService.obtenerDireccion,
    refetchOnWindowFocus: false,
  })
  if (direccionesQuery.isLoading) return <SpinnerPagina/>
  
  return (
    <div className="flex justify-center py-10">
      <div className="py-3 rounded-xl shadow-md bg-gray-200 w-2/4">
        <h1 className="text-center mb-5 font-bold text-3xl">Configura tus direcciones</h1>
        {
          direccionesQuery.data?.map((direccion) =>
            <div className="p-3" key={direccion.iddireccion}>
              <Direccion direccion={direccion} />
            </div>
          )
        }
        <div className="flex justify-center ">
          <BotonPrimario className="w-2/4 m-2" type="submit" onClick={() => navigate("/direccion")}>Agregar nueva dirección</BotonPrimario>
        </div>
      </div>
    </div>
  );
    
}

export default Direcciones;