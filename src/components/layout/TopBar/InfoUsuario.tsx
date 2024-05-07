import { useState } from "react";
import { useSesion } from "../../../hooks";
import { useAppDispatch } from "../../../store";
import { cerrarSesion } from "../../../store/features/sesion";
import LogOut from "../../icons/LogOut";
import IconoUsuario from "../../icons/Usuario";
import BotonTopBar from "./Boton";
import Config from "../../icons/Config";

const InfoUsuario = () => {
  const { info } = useSesion()
  const [ping, setPing] = useState(false)
  const [visible, setVisible] = useState(false)


  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    setPing(true)
    setTimeout(() => {
      dispatch(cerrarSesion());
    }, 300);
  }
  const updateVisible = (visible: boolean) => {
    setVisible(visible)
  }
  return (
    <div className="flex ml-2 gap-x-1" onMouseEnter={() => updateVisible(true)} onMouseLeave={() => updateVisible(false)}>
      <div className="flex px-2 bg-indigo-950 border-l-2 border-r-2 border-dotted border-x-indigo-300 ">

        <div className="hidden md:flex flex-col text-right justify-center h-full transition-all">
          <p className="text-xs text-nowrap">{info.nombres} {info.apellidos}</p>
          <p className="text-indigo-300 text-xs">{info.nombreUsuario}</p>

        </div>
        <div className="flex p-0.5 h-full mx-0.5 sm:mx-1 ">
          <IconoUsuario />
        
        </div>
      
      </div>
      <div className={`flex shrink justify-center ${visible ? "" : "hidden"}`}>
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