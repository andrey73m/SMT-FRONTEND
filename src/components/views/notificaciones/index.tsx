
import { useNotificaciones } from "@/hooks";
import { useMutationNotificaciones } from "@/hooks";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import cn from "@/cn";
import { ElementoFlotante } from "@/components/wrappers"
import { useAppDispatch, useAppSelector } from "@/store";
import { DataNotificacion } from "@/models";
import { cerrarNotificaciones } from "@/store/features/TopBar";


interface NotificacionProps{
  notificacion: DataNotificacion
}

const Notificacion = ({ notificacion }: NotificacionProps) => {

  const { marcarNotificacion } = useMutationNotificaciones()
  const navigate = useNavigate()
  const handleClick = () => {
    marcarNotificacion(notificacion.idnotificacion)
    if (notificacion.idevento === 3)
      navigate(`/tickets/${notificacion.idfuente}`)
  }
  return (
    <span onMouseDown={handleClick}
      className={cn("flex flex-col gap-0 p-2 pt-3 pb-2  w-full border-b hover:cursor-pointer hover:bg-violet-100 transition-colors border-l-8 relative border-l-violet-500",{
        "border-l-gray-500": notificacion.visto
      })}>
      <p className="text-xl">{notificacion.mensaje}</p>
      <div className="flex justify-end">

        <p className=" text-gray-400 text-xs">{notificacion.intervalo}</p>
      </div>
    </span>
  );
}

const ListaNotificaciones = () => {
  const { notificaciones } = useNotificaciones()
  const { abierto } = useAppSelector(state => state.topBar.notificacion)
  const dispatch = useAppDispatch()
  const refBandejaNotificaciones = useRef(null);

  const handleClose = (e: MouseEvent) => {
    if (refBandejaNotificaciones.current && e.target !== refBandejaNotificaciones.current) {
      dispatch(cerrarNotificaciones())
      document.removeEventListener("mousedown", handleClose)
    }

  }

  useEffect(() => {
    console.log("creando evento: ", abierto)
    if (abierto)
      document.addEventListener("mousedown", handleClose)
    else
      document.removeEventListener("mousedown", handleClose)
  },[abierto])

  return (
    <ElementoFlotante
      className={cn("top-topbar text-black rounded-sm bg-white right-0 shadow-lg w-full sm:w-[35rem] border mt-0.5 max-h-72 overflow-auto scale-y-100",{
        "scale-y-0 invisible": !abierto
      })}
    
      ref = {refBandejaNotificaciones}
    >
      <ul>
        {
          notificaciones.map(notificacion =>
            <li key={notificacion.idnotificacion}>
              <Notificacion  notificacion={notificacion}/>
            </li>
          )
        }
      </ul>
      {
        notificaciones.length === 0 && <p className="text-gray-400 text-center p-3">No tienes notificaciones</p>
      }
    </ElementoFlotante>
  );
}
 
export default ListaNotificaciones;