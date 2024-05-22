import direccionesService from "@/services/direccionesService";
import { SpinnerPagina } from "@/components/UI";
import DataDireccion from "@/models/DataDireccion";
import { useQuery } from "@tanstack/react-query";
import Direccion from "./Direccion";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";


const Direcciones = () => {

  const { idusuario } = useParams()
  const direccionesQuery = useQuery<DataDireccion[]>({
    queryKey: ["direcciones"],
    queryFn: () => direccionesService.obtenerDireccion(idusuario),
    refetchOnWindowFocus: false,
    retry:0
  })
  const navigate = useNavigate()
  if (direccionesQuery.isLoading) return <SpinnerPagina/>
  if (direccionesQuery.isError){
    
    if (isAxiosError(direccionesQuery.error)){
      if (direccionesQuery.error.response?.status === 400) navigate("/direcciones")
    }
  }
  return (
    
    <>
      {
        direccionesQuery.data?.map((direccion) =>
          <div className="p-3" key={direccion.iddireccion}>
            <Direccion direccion={direccion} />
          </div>
        )
      }
    </>
  );
    
}

export default Direcciones;