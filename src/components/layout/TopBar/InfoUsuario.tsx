import { TouchEventHandler, useEffect, useRef } from "react";
import { useSesion } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store";

import IconoUsuario from "@/components/icons/Usuario";
import BotonTopBar from "./Boton";
import Config from "@/components/icons/Config";
import { setVisibleBotonPerfil, setToqueBotonPerfil } from "@/store/features/TopBar";
import { ElementoFlotante } from "@/components/wrappers"
import cn from "@/cn";
import BotonLogout from "./BotonLogout";

const InfoUsuario = () => {
  const { info } = useSesion()
  
  const timeOut = useRef(0)
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
  
  const hoverVisible = (visible: boolean) => {
    dispatch(setVisibleBotonPerfil(visible))
  }

  const onSwipe: TouchEventHandler<HTMLDivElement> = (e) => {
    const touchNow = e.changedTouches[0].clientX
    if (touchNow > (touchRef.current + 50))
      dispatch(setVisibleBotonPerfil(false))
    if (touchNow < (touchRef.current - 50))
      dispatch(setVisibleBotonPerfil(true))
  }

  const onTouch = () => {
    if (!deslizado){
      dispatch(setToqueBotonPerfil(true))
      clearTimeout(timeOut.current)
      timeOut.current = window.setTimeout(() => dispatch(setToqueBotonPerfil(false)), 4000)
    }
  }
  return (
    <div className="flex ml-2 gap-x-1" onMouseEnter={() => hoverVisible(true)} onMouseLeave={() => hoverVisible(false)}>
      <div className="flex px-2 bg-indigo-950 border-l-2 border-r-2 border-dotted border-x-indigo-300 ">

        <div className={cn("md:flex flex-col md:static text-center md:text-right justify-center h-full transition-all",{
          "hidden": !visible,
          "flex absolute top-full left-0 w-full p-2 bg-indigo-950": visible
        })}>
          <p className="text-xs text-nowrap">{info.nombres} {info.apellidos}</p>
          <p className="text-indigo-300 text-xs">{info.nombreUsuario}</p>

        </div>
        <div className="flex p-0.5 h-full mx-0.5 sm:mx-1 " onTouchMove={onSwipe} onTouchEnd={onTouch}>
          <IconoUsuario className="w-12"/>
          <ElementoFlotante className={cn("right-0 top-full bg-black/35 p-3 rounded-lg w-40 text-sm", { "opacity-100": toque, "opacity-0 hidden": !toque })}>Desliza a la izquierda para ver las opciones</ElementoFlotante>
        </div>
      
      </div>
      <div className={cn("flex gap-x-3 justify-center transition-all",{
        "opacity-100": visible,
        "opacity-0 hidden": !visible
      })}>
        <BotonTopBar className="w-12">
          <Config className="transition-all" />
        </BotonTopBar>
        <BotonLogout/>
      </div>
    </div>
  );
}
 
export default InfoUsuario;