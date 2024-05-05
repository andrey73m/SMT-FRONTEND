import { useState } from "react";
import LogOut from "../../icons/LogOut";
import Config from "../../icons/Config";
import { useSesion } from "../../../hooks";
import { useAppDispatch } from "../../../store";
import { cerrarSesion } from "../../../store/features/sesion";
import { Link, Outlet } from "react-router-dom";
import BotonTopBar from "./Boton";
import BotonNotificaciones from "./BotonNotificaciones";
import LogoTopBar from "./Logo";
import InfoUsuario from "./InfoUsuario";

const TopBar = () => {

  const { haySesion } = useSesion()
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
      <div className="flex grow  w-full h-12 bg-violet-950 text-white">
        
        <LogoTopBar/>
        <div className="flex grow justify-end pr-4">
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
              <div className="flex mx-4 gap-x-2 relative">



                <BotonTopBar >
                  <Config className="transition-all" />
                </BotonTopBar>
                <BotonNotificaciones />
                <BotonTopBar onClick={logoutHandler} >
                  <LogOut className="hover:text-pink-500 transition-colors" ping={ping} />
                </BotonTopBar>
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