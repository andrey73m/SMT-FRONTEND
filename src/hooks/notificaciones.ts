import { useAppSelector } from "../store";

const useNotificaciones = () => {
  const notificaciones = useAppSelector(state => state.notificaciones)

  const hayPendientes = notificaciones.some(notificacion => !notificacion.vista)
  
  return { notificaciones, hayPendientes };
}

export default useNotificaciones;