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
  const queryClient = useQueryClient()

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

  const notificationsMutation = useMutation({
    mutationFn: notificationService.setNotificationView,
    onSuccess: (vista: DataNotificacion) => {
      const notificaciones = queryClient.getQueryData<DataNotificacion[]>(["notificaciones"])
      if (!notificaciones) return;
      queryClient.setQueryData(["notificaciones"], notificaciones.map(notificacion =>
        notificacion.idnotificacion === vista.idnotificacion ?
          vista : notificacion
      ))
    }
  })

  const marcarNotificacion = (idnotificacion:string) => {
    console.log("MUTATING")
    notificationsMutation.mutate(idnotificacion)
  }

  const hayPendientes = notificationQuery.data?.some(notificacion => !notificacion.visto)
  
  return { notificaciones: notificationQuery.data, cargando: notificationQuery.isFetching, hayPendientes, marcarNotificacion };
}

export default useNotificaciones;