
import { DataNotificacion } from "../../hooks/notificaciones";
import ListaFlotante from "./ListaFlotante";
import { useMutationNotificaciones } from "../../hooks/notificaciones";


interface NotificacionProps{
  notificacion: DataNotificacion
}

const Notificacion = ({ notificacion }: NotificacionProps) => {
  const marcar = notificacion.visto ? "border-l-gray-500" : "border-l-violet-500"

  const { marcarNotificacion } = useMutationNotificaciones()
  const handleClick = () => {
    marcarNotificacion(notificacion.idnotificacion)
  }
  return (
    <span onClick={handleClick}
      className={`flex flex-col gap-0 p-2 pt-3 pb-2  w-full border-b hover:cursor-pointer hover:bg-violet-100 transition-colors border-l-8 relative ${marcar}`}>
      <p>{notificacion.mensaje}</p>
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

const ListaNotificaciones = ({ abierto, notificaciones }: ListaNotificacionesProps) => {

  return (
    <ListaFlotante abierto={abierto} className="
        top-full text-black
        rounded-sm bg-white right-0
        shadow-lg w-96 border
        mt-0.5 max-h-72  overflow-auto"
    >
      {
        notificaciones.map(notificacion =>
          <Notificacion key={notificacion.idnotificacion} notificacion={notificacion}/>
        )
      }
      {
        notificaciones.length === 0 && <p className="text-gray-400 text-center p-3">No tienes notificaciones</p>
      }
    </ListaFlotante>
  );
}
 
export default ListaNotificaciones;