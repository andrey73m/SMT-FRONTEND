
import { useSesion } from "../../../hooks";
import { Link, Outlet } from "react-router-dom";
import BotonTopBar from "./Boton";
import BotonNotificaciones from "./BotonNotificaciones";
import LogoTopBar from "./Logo";
import InfoUsuario from "./InfoUsuario";
import BotonMenu from "./BotonMenu";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { resetTobBar } from "../../../store/features/TopBar";
import MenuFlotante from "../MenuFlotante";
import ListaNotificaciones from "../../views/notificaciones";

const TopBar = () => {

  const { haySesion } = useSesion()
  const dispatch = useAppDispatch()

  useEffect(() =>
    () => {dispatch(resetTobBar())},[])
  return (
    <>
      <div className="mt-12">
        <Outlet />
      </div>
      <div className="flex fixed top-0 w-full h-12 bg-violet-950 text-white z-40">
        <BotonMenu/>
        <LogoTopBar/>
        <div className="flex h-full grow justify-end pr-1">
          {!haySesion &&
            <>
              <BotonTopBar className="px-2">
                <Link to="/registro">
                  <p className="font-bold">Regístrate</p>
                </Link>
              </BotonTopBar>
              <BotonTopBar className="px-2">
                <Link to="/login">
                  <p className="font-bold">LogIn</p>
                </Link>
              </BotonTopBar>
            </>
          }
          {
            haySesion &&
            <>
              <div className="flex h-full px-2 gap-x-2 sm:relative">
                
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