
import ListaFlotante from "../../wrappers/ListaFlotante";
import { DataNotificacion } from "../../../hooks";
import { useMutationNotificaciones } from "../../../hooks";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";


interface NotificacionProps{
  notificacion: DataNotificacion
}

const Notificacion = ({ notificacion }: NotificacionProps) => {
  const marcar = notificacion.visto ? "border-l-gray-500" : "border-l-violet-500"

  const { marcarNotificacion } = useMutationNotificaciones()
  const navigate = useNavigate()
  const handleClick = () => {
    marcarNotificacion(notificacion.idnotificacion)
    if (notificacion.idevento === 3)
      navigate(`/tickets/${notificacion.idfuente}`)
  }
  return (
    <span onMouseDown={handleClick}
      className={`flex flex-col gap-0 p-2 pt-3 pb-2  w-full border-b hover:cursor-pointer hover:bg-violet-100 transition-colors border-l-8 relative ${marcar}`}>
      <p className="text-xl">{notificacion.mensaje}</p>
      <div className="flex justify-end">

        <p className=" text-gray-400 text-xs">{notificacion.intervalo}</p>
      </div>
    </span>
  );
}

interface ListaNotificacionesProps {
  abierto: boolean
  notificaciones: DataNotificacion[]
}

const ListaNotificaciones = forwardRef<HTMLDivElement, ListaNotificacionesProps>(({ abierto, notificaciones }, ref) => {

  return (
    <ListaFlotante
      abierto={abierto}
      className="
        top-full text-black
        rounded-sm bg-white right-0
        shadow-lg w-full sm:w-[35rem] border
        mt-0.5 max-h-72 mb-12  overflow-auto"

      ref = {ref}
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
    </ListaFlotante>
  );
})

ListaNotificaciones.displayName = "ListaNotificaciones"
 
export default ListaNotificaciones;