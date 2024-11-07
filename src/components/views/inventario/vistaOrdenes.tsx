import { SpinnerPagina } from "@/components/UI";
import { OrdenCompra } from "@/models/DataOrdenCompra";
import tiendaService from "@/services/tiendaService";
import { useQuery } from "@tanstack/react-query";
import TarjetaOrden from "./tarjetaOrden";

const Ordenes = () => {

  const ordenesQuery = useQuery<OrdenCompra[]>({
    queryKey: ["ordenes"],
    queryFn: tiendaService.obtenerOrdenes,
    refetchOnWindowFocus: false,
  })
  if (ordenesQuery.isLoading) return <SpinnerPagina/>
  
  return (
    <div className="flex flex-col min-h-screen w-full py-6 lg:px-10 bg-slate-100">
      {
        ordenesQuery.data?.map((orden) =>
          <div className="p-8" key={orden.idorden}>
            <TarjetaOrden orden={orden} />
          </div>
        )
      }
    </div> );
}

export default Ordenes;