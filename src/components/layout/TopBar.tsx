import IconoNotificacion from "../icons/CampanaNotificacion";
import LogOut from "../icons/LogOut";
import Config from "../icons/Config";
import useSesion from "../../hooks/sesion";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { cerrarSesion } from "../../store/features/sesion";
import socketService from "../../services/socketService";
import { Link, Outlet } from "react-router-dom";
import ListaNotificaciones from "./ListaNotificaciones";
import IconoUsuario from "../icons/Usuario";
import LogoPrincipal from "../icons/LogoPrincipal";
import { useMutationNotificaciones, useNotificaciones } from "../../hooks";
import { DataNotificacion } from "../../hooks/notificaciones";
import timeService from "../../services/timeService";



interface BotonProps extends React.HTMLAttributes<HTMLDivElement>{}

const BotonTopBar = ({ className,children, ...props }: BotonProps) => {
  return (
    <div {...props} className={`group relative flex p-0.5 justify-center items-center hover:bg-purple-950 ${className}`}>
      {children}
    </div>
  )
}


const BotonNotificaciones = () => {
  const [abierto, setAbierto] = useState(false)
  const [vistas, setVistas] = useState(true)
  const { hayPendientes, notificaciones } = useNotificaciones()
  const { agregarNotificacion } = useMutationNotificaciones()
  //TODO:OPCIONAL > MANEJAR CON REF QUE EL CLICK NO SEA SOBRE LA LISTA????
  const handleClose = () => {
    setAbierto(false)
  }

  const clickHandler = () => {
    setAbierto(true)
    setVistas(true);
    document.addEventListener("mousedown",handleClose)
  }
  useEffect(() => {
    const onNotification = (notificacion: DataNotificacion) => {
      console.log("abierto:", abierto)
      if (!abierto) setVistas(false);
      notificacion.intervalo = timeService.convertirFechaEnIntervalo(notificacion.fecha_creacion)
      agregarNotificacion(notificacion)
    }
    socketService.on("notificacion", onNotification);
    console.log("useeffect")
    return () => {
      socketService.off("notificacion")
    }
  }, [])
  useEffect(() => () => document.removeEventListener("mousedown", handleClose), [])

  return (
    <>
      <BotonTopBar onClick={clickHandler} >
        <IconoNotificacion nuevas={!vistas} className="group-hover:text-cyan-200 transition-colors" />
        {hayPendientes &&
          <span className="w-3 h-3 bg-fuchsia-600 rounded-full absolute right-1 bottom-1 "></span>
        }
      </BotonTopBar>
      <ListaNotificaciones notificaciones={notificaciones} abierto = {abierto}/>
    </>
  )
}


const TopBar = () => {

  const { haySesion, info } = useSesion()
  const [ping,setPing] = useState(false)


  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    setPing(true)
    setTimeout(() => {
      dispatch(cerrarSesion());
    }, 300);
  }

  return (
    <>
      <div className="flex  w-full h-11 bg-violet-950 text-white">
        
        <div className="flex flex-nowrap text-white items-center bg-purple-950 gap-x-3 pr-3">
          <div className="flex h-full bg-purple-900">
            <LogoPrincipal/>
          </div>
          <h2 className="font-bold text-2xl">Support Max TI</h2>
        </div>
        <div className="flex grow justify-end">
          {!haySesion &&
            <>
              <BotonTopBar className="px-2">
                <Link to="/registro">
                  <h2 className="font-bold">Regístrate</h2>

                </Link>
              </BotonTopBar>
              <BotonTopBar className="px-2">
                <Link to="/login">
                  <h2 className="font-bold">LogIn</h2>

                </Link>
              </BotonTopBar>
            </>
          }
          {
            haySesion &&
            <div className="flex px-4 bg-indigo-950 border-r-2 border-dotted border-x-indigo-300">

              <div className="flex p-0.5 h-full mr-2">
                <IconoUsuario />
              </div>
              <div className="flex flex-col justify-center h-full">
                <p className="text-xs">{info.nombres} {info.apellidos}</p>
                <p className="text-indigo-300 text-xs">{info.nombreUsuario}</p>

              </div>
            </div>

          }
          <div className="flex mx-4 gap-x-2 relative">
            <BotonTopBar >
              <Config className="transition-all"/>
            </BotonTopBar>
          
            {haySesion &&
          <>
            <BotonNotificaciones />
            <BotonTopBar onClick={logoutHandler} >
              <LogOut className="hover:text-pink-500 transition-colors" ping={ping}/>
            </BotonTopBar>
          </>
            }
          </div>

        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default TopBar;