import { TouchEventHandler, useEffect, useRef, useState } from "react";
import { useSesion } from "../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../store";
import { cerrarSesion } from "../../../store/features/sesion";
import LogOut from "../../icons/LogOut";
import IconoUsuario from "../../icons/Usuario";
import BotonTopBar from "./Boton";
import Config from "../../icons/Config";
import { setVisibleBotonPerfil, setToqueBotonPerfil } from "../../../store/features/TopBar";
import ElementoFlotante from "../../wrappers/ElementoFlotante";

const InfoUsuario = () => {
  const { info } = useSesion()
  const [ping, setPing] = useState(false)
  const [timeOut, setTimeOut] = useState(0)
  const { visible,toque, deslizado } = useAppSelector(state => state.topBar.botonesPerfil)
  const touchRef = useRef(0)

  const dispatch = useAppDispatch()
  useEffect(() => {
    const startTouch = (e: TouchEvent) => {
      touchRef.current = e.touches[0].clientX
    }
    document.addEventListener("touchstart",startTouch)
    return () => document.removeEventListener("touchstart",startTouch)
  },[])
  const logoutHandler = () => {
    setPing(true)
    setTimeout(() => {
      dispatch(cerrarSesion());
    }, 300);
  }
  const hoverVisible = (visible: boolean) => {
    dispatch(setVisibleBotonPerfil(visible))
  }

  const onSwipe: TouchEventHandler<HTMLDivElement> = (e) => {
    const touchNow = e.changedTouches[0].clientX
    console.log("DIF", touchRef.current - touchNow)
    if (touchNow > (touchRef.current + 80))
      dispatch(setVisibleBotonPerfil(false))
    if (touchNow < (touchRef.current - 80))
      dispatch(setVisibleBotonPerfil(true))
  }

  const onTouch = () => {
    if (!deslizado){
      dispatch(setToqueBotonPerfil(true))
      clearTimeout(timeOut)
      setTimeOut(setTimeout(() => dispatch(setToqueBotonPerfil(false)), 4000))
    }
  }
  return (
    <div className="flex ml-2 gap-x-1" onMouseEnter={() => hoverVisible(true)} onMouseLeave={() => hoverVisible(false)}>
      <div className="flex px-2 bg-indigo-950 border-l-2 border-r-2 border-dotted border-x-indigo-300 ">

        <div className="hidden md:flex flex-col text-right justify-center h-full transition-all">
          <p className="text-xs text-nowrap">{info.nombres} {info.apellidos}</p>
          <p className="text-indigo-300 text-xs">{info.nombreUsuario}</p>

        </div>
        <div className="flex p-0.5 h-full mx-0.5 sm:mx-1 " onTouchMove={onSwipe} onTouchEnd={onTouch}>
          <IconoUsuario />
          <ElementoFlotante className="right-0 top-full bg-black/35 p-3 rounded-lg w-40 text-sm" enAbierto={["opacity-100", "opacity-0"]} abierto={toque}>Desliza a la izquierda para ver las opciones</ElementoFlotante>
        </div>
      
      </div>
      <div className={`flex shrink justify-center transition-all ${visible ? "opacity-100" : "opacity-0 hidden"}`}>
        <BotonTopBar onClick={logoutHandler} >
          <LogOut className="hover:text-rose-600 transition-colors" ping={ping} />
        </BotonTopBar>
        <BotonTopBar >
          <Config className="transition-all" />
        </BotonTopBar>
      </div>
    </div>
  );
}
 
export default InfoUsuario;