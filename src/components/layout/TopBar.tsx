import IconoNotificacion from "../icons/CampanaNotificacion";
import LogOut from "../icons/LogOut";
import Config from "../icons/Config";
import useSesion from "../../hooks/sesion";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { cerrarSesion } from "../../store/features/sesion";
import socketService from "../../services/socketService";
import { Outlet } from "react-router-dom";
import { DataNotificacion, agregarNotificacion } from "../../store/features/notificaciones";
import useNotificaciones from "../../hooks/notificaciones";
import ListaNotificaciones from "./ListaNotificaciones";

interface BotonProps extends React.HTMLAttributes<HTMLDivElement>{}

const BotonTopBar = ({ children, ...props }: BotonProps) => {
  return (
    <div {...props} className="group flex p-0.5 justify-center hover:bg-purple-950">
      {children}
    </div>
  )
}


const BotonNotificaciones = () => {
  const [abierto, setAbierto] = useState(false)
  const { hayPendientes } = useNotificaciones()

  //TODO:OPCIONAL > MANEJAR CON REF QUE EL CLICK NO SEA SOBRE LA LISTA????
  const handleClose = () => {
    setAbierto(false)
  }

  const clickHandler = () => {
    setAbierto(true)
    document.addEventListener("mousedown",handleClose)
  }
  useEffect(() =>
    () => {document.removeEventListener("mousedown", handleClose)}
  ,[])

  return (
    <>
      <BotonTopBar onClick={clickHandler} >
        <IconoNotificacion pendiente={hayPendientes} className="group-hover:text-cyan-200 transition-colors" />
      </BotonTopBar>
      <ListaNotificaciones abierto = {abierto}/>
    </>
  )
}


const TopBar = () => {

  const { haySesion } = useSesion()
  const [ping,setPing] = useState(false)


  const dispatch = useAppDispatch();
  
  useEffect ( () => {
    const onNotification = (notificacion: DataNotificacion) => {
      console.log("notificacion")
      dispatch(agregarNotificacion(notificacion))
    }
    socketService.socket.on("notificacion", onNotification);
    console.log("useeffect")
    return () => {
      socketService.socket.off("notificacion")
    }
  }, [] )

  const logoutHandler = () => {
    setPing(true)
    setTimeout(() => {
      dispatch(cerrarSesion());
    }, 300);
  }

  return (
    <>
      <div className="flex justify-end w-full h-10 bg-indigo-950 text-white pr-3">
        <div className="flex relative ">
          <BotonTopBar >
            <Config className="transition-all"/>
          </BotonTopBar>
          <BotonNotificaciones/>
          {haySesion &&
            <BotonTopBar onClick={logoutHandler} >
              <LogOut className="hover:text-pink-500 transition-colors" ping={ping}/>
            </BotonTopBar>
          }
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default TopBar;