
import timeService from "@/services/timeService"
import { store, useAppDispatch, useAppSelector } from "@/store"
import { abrirNotificaciones } from "@/store/features/TopBar"
import { socketService } from "@/services/socketService"
import { useEffect, useState } from "react"
import BotonTopBar from "./Boton"
import IconoNotificacion from "@/components/icons/CampanaNotificacion"
import ListaNotificaciones from "@/components/views/notificaciones"
import { useMutationNotificaciones } from "@/hooks"
import { DataNotificacion } from "@/models"
import PuntoIndicador from "../PuntoIndicador"

const BotonNotificaciones = () => {
  const [vistas, setVistas] = useState(true)
  const { hayPendientes } = useAppSelector(state => state.topBar.notificacion)
  const { agregarNotificacion } = useMutationNotificaciones()
  const dispatch = useAppDispatch()


  const clickHandler = () => {
    dispatch(abrirNotificaciones())
    setVistas(true);
  }
  useEffect(() => {
    const onNotification = (notificacion: DataNotificacion) => {
      const state = store.getState()
      if (!state.topBar.notificacion.abierto) setVistas(false);
      notificacion.intervalo = timeService.convertirFechaEnIntervalo(notificacion.fecha_creacion)
      agregarNotificacion(notificacion)
    }
    socketService.on("notificacion", onNotification);
    console.log("useeffect")
    return () => {
      socketService.off("notificacion")
    }
  }, [])
  return (
    <>
      <BotonTopBar onClick={clickHandler} >
        <IconoNotificacion nuevas={!vistas} className="group-hover:text-cyan-200 transition-colors" />
        {hayPendientes &&
          <PuntoIndicador className="absolute right-1 bottom-1"/>
        }
      </BotonTopBar>
      <ListaNotificaciones/>
    </>
  )
}

export default BotonNotificaciones;