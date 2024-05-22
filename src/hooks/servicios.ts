import { DataServicio } from "@/models"
import servicioService from "@/services/servicioService"
import { notificarError, notificarExito } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

export const useServicios = () => {
  return useQuery<DataServicio[]>({
    queryKey: ["servicios"],
    queryFn: servicioService.obtenerServicios,
    refetchOnWindowFocus:false
  })
}

export const useMutacionAgregarServicio = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: servicioService.crearServicio,
    onSuccess: (servicio:DataServicio) => {
      notificarExito("Servicio agregado");
      callback()
      queryClient.setQueryData(["servicios"], (data: DataServicio[]) => data?.concat(servicio))
    },
    onError: (error) => {
      if (isAxiosError(error)){
        if (error.response){
          notificarError(error.response.data.error);

        }
      }
    }
  })
}

export const useMutacionActualizarServicio = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: servicioService.actualizarServicio,
    onSuccess: (updated:DataServicio) => {
      notificarExito("Servicio actualizado");
      callback()
      queryClient.setQueryData(["servicios"], (data: DataServicio[]) => data?.map(servicio => servicio.idtipo_servicio === updated.idtipo_servicio ? updated : servicio))
    },
    onError: (error) => {
      if (isAxiosError(error)){
        if (error.response){
          notificarError(error.response.data.error);

        }
      }
    }
  })
}
export const useMutacionEliminarServicio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: servicioService.eliminarServicio,
    onSuccess: (deleted:DataServicio) => {
      notificarExito("Servicio eliminado");
      queryClient.setQueryData(["servicios"], (data: DataServicio[]) => data?.filter(servicio => servicio.idtipo_servicio !== deleted.idtipo_servicio))
    },
    onError: (error) => {
      if (isAxiosError(error)){
        if (error.response){
          notificarError(error.response.data.error);

        }
      }
    }
  })
}