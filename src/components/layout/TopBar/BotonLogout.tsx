import { useRef, useState } from "react";
import LogOut from "../../icons/LogOut";
import BotonTopBar from "./Boton";
import { useAppDispatch, useAppSelector } from "../../../store";
import { cerrarSesion } from "../../../store/features/sesion";
 
const BotonLogout = () => {
  const safeTimer = useRef(0)
  const { visible } = useAppSelector(state => state.topBar.botonesPerfil)

  const limpiarTimer = () => {
    clearTimeout(safeTimer.current);
    safeTimer.current = 0;
  }
  if (visible){
    if (safeTimer.current) limpiarTimer();
    safeTimer.current = setTimeout(limpiarTimer,300)
  }

  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    if (!safeTimer){
      setPing(true)
      setTimeout(() => {
        dispatch(cerrarSesion());
      }, 300);
    }
  }
  const [ping, setPing] = useState(false)
  return (
    <BotonTopBar onClick={logoutHandler} >
      <LogOut className="hover:text-rose-600 transition-colors" ping={ping} />
    </BotonTopBar>
  );
}
 
export default BotonLogout;