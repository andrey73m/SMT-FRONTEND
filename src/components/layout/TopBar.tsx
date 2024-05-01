import IconoNotificacion from "../icons/CampanaNotificacion";
import LogOut from "../icons/LogOut";
import Config from "../icons/Config";
import useSesion from "../../hooks/sesion";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { cerrarSesion } from "../../store/features/sesion";
import socketService from "../../services/socketService";

const TopBar = () => {

  const { haySesion } = useSesion()

  const [ping,setPing] = useState("")

  const [pendiente, setPendiente] = useState(false)

  const [mensajes, setMensajes] = useState(["hola",1])

  const dispatch = useAppDispatch();
  
  useEffect ( () => {
    const onNotification = (notificacion: any) => {
      setPendiente(true);
      const mensajes2 = mensajes.concat(notificacion.mensaje)
      setMensajes(mensajes2)
    }
    socketService.socket.on("notificacion", onNotification);
    console.log("useeffect")
  }, [mensajes] )
  

  console.log(mensajes);


  const notificationHandler = () => {
    setPendiente(false);
  }

  const logoutHandler = () => {
    setPing("animate-ping")
    setTimeout(() => {
      dispatch(cerrarSesion());
    }, 1000);
  }

  return (
    <div className="flex justify-end w-full h-10 bg-indigo-950 text-white p-1 pr-3">
      {/* <div className="absolute left-2 top-10 text-black">
        <ul>
          {mensajes.map( (mensaje, index) => { return <li key={ index } > {index} { mensaje } </li> } )}
        </ul>
      </div> */}
 
      <div className="flex gap-x-1">
        <Config/>
        <div onClick={notificationHandler} className="flex" > <IconoNotificacion  pendiente= {pendiente} /> </div>
        {haySesion &&
          <LogOut onClick={logoutHandler} className={ping}/>
        }
      </div>
    </div>
  )
}

export default TopBar;