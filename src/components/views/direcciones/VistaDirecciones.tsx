import direccionesService from "@/services/direccionesService";
import { SpinnerPagina } from "@/components/UI";
import DataDireccion from "@/models/DataDireccion";
import { useQuery } from "@tanstack/react-query";
import Direccion from "./Direccion";
import AlternarFormulario from "@/components/layout/AlternarFormularioTicket";
import FormularioDireccion from "@/components/formularios/direccion";
import { VistaRol } from "@/components/wrappers";
const Direcciones = () => {

  const direccionesQuery = useQuery<DataDireccion[]>({
    queryKey: ["direcciones"],
    queryFn: direccionesService.obtenerDireccion,
    refetchOnWindowFocus: false,
  })
  if (direccionesQuery.isLoading) return <SpinnerPagina/>
  
  return (
    <div className="flex justify-center py-10 px-2">
      <div className="py-3 rounded-xl shadow-md bg-gray-200 w-full lg:w-2/4 tansition-all">
        <VistaRol roles={["cliente"]}>
          <h1 className="text-center mb-5 font-bold text-3xl">Configura tus direcciones</h1>
          <div className="flex justify-center ">
            <AlternarFormulario texto="Agrega una dirección">
              <FormularioDireccion />
            </AlternarFormulario>
          </div>
        </VistaRol>
        <VistaRol roles={["admin"]}><h1 className="text-center mb-5 font-bold text-3xl">Direcciones de usuario</h1></VistaRol>
        {
          direccionesQuery.data?.map((direccion) =>
            <div className="p-3" key={direccion.iddireccion}>
              <Direccion direccion={direccion} />
            </div>
          )
        }
      </div>
    </div>
  );
    
}

export default Direcciones;