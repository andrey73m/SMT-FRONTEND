import { SpinnerPagina } from "@/components/UI";
import Direccion from "./Direccion";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryDirecciones } from "@/hooks";

interface DireccionesProps {
  modoCompra?: boolean
  afterSelect?: () => void
}

const Direcciones = ({ modoCompra, afterSelect }: DireccionesProps) => {

  const { idusuario } = useParams()
  const direccionesQuery = useQueryDirecciones(idusuario)

  
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
        direccionesQuery.data &&
        <>{
          direccionesQuery.data.length > 0 ?
            direccionesQuery.data?.sort((d1) =>
              d1.predeterminada ? -1 : 1
            ).map((direccion) =>
              <div className="p-3" key={direccion.iddireccion}>
                <Direccion direccion={direccion} modoCompra={modoCompra} afterSelect={afterSelect}/>
              </div>
            )
            :
            <p className="font-bold text-center p-4 text-lg text-slate-400">Parece que no hay direcciones</p>}
        </>
      }
    </>
  );
    
}

export default Direcciones;