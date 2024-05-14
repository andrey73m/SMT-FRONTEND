
import { useSesion } from "@/hooks";
import { Outlet } from "react-router-dom";
import BotonTopBar from "./Boton";
import BotonNotificaciones from "./BotonNotificaciones";
import LogoTopBar from "./Logo";
import InfoUsuario from "./InfoUsuario";
import BotonMenu from "./BotonMenu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetTobBar } from "@/store/features/TopBar";
import MenuFlotante from "../MenuFlotante";
import cn from "@/cn";
import RedirectionURILink from "@/components/wrappers/RedirectionURILink";
import BotonCarritoCompras from "./BotonCarritoCompras";
import { VistaRol } from "@/components/wrappers";

const TopBar = () => {

  const { haySesion } = useSesion()
  const dispatch = useAppDispatch()
  const { visible } = useAppSelector(state => state.topBar)
  useEffect(() =>
    () => {dispatch(resetTobBar())},[])
  return (
    <>
      <div className="mt-topbar">
        <Outlet />
      </div>
      <div className={cn("flex transition-transform fixed top-0 w-full h-topbar bg-violet-950 text-white z-40",{
        "top-topbar": !visible
      })}>
        <BotonMenu/>
        <LogoTopBar/>
        <div className="flex h-full grow justify-end pr-1">
          {!haySesion &&
            <>
              <BotonTopBar className="px-2">
                <RedirectionURILink to="/registro">
                  <p className="font-bold">Regístrate</p>
                </RedirectionURILink>
              </BotonTopBar>
              <BotonTopBar className="px-2">
                <RedirectionURILink to="/login">
                  <p className="font-bold">LogIn</p>
                </RedirectionURILink>
              </BotonTopBar>
            </>
          }
          {
            haySesion &&
            <>
              <div className="flex h-full px-2 gap-x-2 sm:relative">
                <VistaRol roles={["cliente"]}>
                  <BotonCarritoCompras/>
                </VistaRol>
                <BotonNotificaciones />
                
                <InfoUsuario/>

              </div>
            </>
          }
        </div>
      </div>

      
      <MenuFlotante />
    </>
  )
}

export default TopBar;