import { DataNotificacion, useMutationNotificaciones, useNotificaciones } from "../../../hooks"
import timeService from "../../../services/timeService"
import { store, useAppDispatch } from "../../../store"
import { abrirNotificaciones,cerrarNotificaciones } from "../../../store/features/Topbar/notificacion"
import { socketService } from "../../../services/socketService"
import { useEffect, useRef, useState } from "react"
import BotonTopBar from "./Boton"
import IconoNotificacion from "../../icons/CampanaNotificacion"
import ListaNotificaciones from "./ListaNotificaciones"

const BotonNotificaciones = () => {
  const [vistas, setVistas] = useState(true)
  const { hayPendientes, notificaciones, abierto } = useNotificaciones()
  const { agregarNotificacion } = useMutationNotificaciones()
  const refLista = useRef(null)

  const dispatch = useAppDispatch()
  //TODO:OPCIONAL > MANEJAR CON REF QUE EL CLICK NO SEA SOBRE LA LISTA????
  const handleClose = (e: MouseEvent) => {
    if (refLista.current && e.target !== refLista.current){
      dispatch(cerrarNotificaciones())
      document.removeEventListener("mousedown", handleClose)
    }

  }

  const clickHandler = () => {
    dispatch(abrirNotificaciones())
    setVistas(true);
    
    document.addEventListener("mousedown", handleClose)
  }
  useEffect(() => {
    const onNotification = (notificacion: DataNotificacion) => {
      const state = store.getState()
      if (!state.notificaciones.abierto) setVistas(false);
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
          <span className="w-3 h-3 bg-fuchsia-600 rounded-full absolute right-1 bottom-1 "></span>
        }
      </BotonTopBar>
      <ListaNotificaciones notificaciones={notificaciones} abierto={abierto} ref={refLista}/>
    </>
  )
}

export default BotonNotificaciones;