import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationService from "@/services/notificationService";
import timeService from "@/services/timeService";
import { useAppDispatch } from "@/store";
import { setHayPendientes } from "@/store/features/TopBar";
import { DataNotificacion } from "@/models";
import { useEffect } from "react";


export const useNotificaciones = () => {
  const notificationQuery = useQuery<DataNotificacion[]>({
    queryKey: ["notificaciones"],
    queryFn: async () => {
      const notificaciones: DataNotificacion[] = await notificationService.getNotifications()
      console.log("FETCHING AGAI!?")
      return notificaciones.map(notificacion => {
        notificacion.intervalo = timeService.convertirFechaEnIntervalo(notificacion.fecha_creacion);
        return notificacion
      })
    },
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    initialData: [],
    retry: 1,
    staleTime: Infinity
  })

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (!notificationQuery.isFetching){
      const pendientes = notificationQuery.data.some(notificacion => !notificacion.visto)
      dispatch(setHayPendientes(pendientes))
      console.log("calculando pendiente")
    }
  },[notificationQuery.data])
  
  return {
    notificaciones: notificationQuery.data,
    cargando: notificationQuery.isFetching
  };
}

export const useMutationNotificaciones = () => {
  const queryClient = useQueryClient()
  const notificationView = useMutation({
    mutationFn: notificationService.setNotificationView,
    onSuccess: (vista: DataNotificacion) => {
      vista.intervalo = timeService.convertirFechaEnIntervalo(vista.fecha_creacion)
      const notificaciones = queryClient.getQueryData<DataNotificacion[]>(["notificaciones"]) || []
      queryClient.setQueryData(["notificaciones"], notificaciones.map(notificacion =>
        notificacion.idnotificacion === vista.idnotificacion ?
          vista : notificacion
      ))
    }
  })
  const agregarNotificacion = (notification: DataNotificacion) => {
    const notificaciones = queryClient.getQueryData<DataNotificacion[]>(["notificaciones"]) || []
    queryClient.setQueryData(["notificaciones"],[notification].concat(notificaciones))

  }

  const marcarNotificacion = (idnotificacion:string) => {
    notificationView.mutate(idnotificacion)
  }

  return { marcarNotificacion, agregarNotificacion }
}