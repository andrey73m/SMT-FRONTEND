import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationService from "../services/notificationService";
import timeService from "../services/timeService";

export interface DataNotificacion{
  idnotificacion: string,
  idevento: number,
  idtipo: number,
  idusuario_iniciador: string,
  idusuario_notificado: string,
  rol_notificado: string[],
  idfuente: string,
  mensaje: string,
  fecha_creacion: Date,
  intervalo: string,
  visto?: boolean
}

const useNotificaciones = () => {
  
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
    initialData: [],
    retry: 1
  })

  const hayPendientes = notificationQuery.data?.some(notificacion => !notificacion.visto)
  
  return {
    notificaciones: notificationQuery.data,
    cargando: notificationQuery.isFetching,
    hayPendientes
  };
}

const useMutationNotificaciones = () => {
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



export { useNotificaciones, useMutationNotificaciones };