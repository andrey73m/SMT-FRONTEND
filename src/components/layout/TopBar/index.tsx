import Config from "../../icons/Config";
import { useSesion } from "../../../hooks";
import { Link, Outlet } from "react-router-dom";
import BotonTopBar from "./Boton";
import BotonNotificaciones from "./BotonNotificaciones";
import LogoTopBar from "./Logo";
import InfoUsuario from "./InfoUsuario";
import BotonMenu from "../MenuBar";

const TopBar = () => {

  const { haySesion } = useSesion()
  

  return (
    <>
      <div className="flex fixed top-0 w-full h-12 bg-violet-950 text-white z-50">
        <BotonMenu/>
        <LogoTopBar/>
        <div className="flex grow justify-end pr-1">
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
            <>
              <div className="flex mx-2 gap-x-2 sm:relative">
                <BotonTopBar >
                  <Config className="transition-all" />
                </BotonTopBar>
                <BotonNotificaciones />
                
                <InfoUsuario/>

              </div>
            </>
          }
        </div>
      </div>
      <Outlet/>

    </>
  )
}

export default TopBar;