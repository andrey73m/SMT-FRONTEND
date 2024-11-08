import { DataCupon } from "@/models/DataPromociones";
import promocionService from "@/services/promocionService";
import { useQuery } from "@tanstack/react-query";

export const useQueryCupones = () => {
  return useQuery<DataCupon[]>({
    queryKey: ["cupones"],
    queryFn: promocionService.obtenerCupones,
    refetchOnWindowFocus: false,
    retry: 0
  })
}