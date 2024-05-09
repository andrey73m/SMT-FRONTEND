import { useRef, useState } from "react";
import LogOut from "@/components/icons/LogOut";
import BotonTopBar from "./Boton";
import { useAppDispatch, useAppSelector } from "@/store";
import { cerrarSesion } from "@/store/features/sesion";
import { useQueryClient } from "@tanstack/react-query";
 
const BotonLogout = () => {
  const safeTimer = useRef(0)
  const { visible } = useAppSelector(state => state.topBar.botonesPerfil)
  const queryClient = useQueryClient()

  const limpiarTimer = () => {
    clearTimeout(safeTimer.current);
    safeTimer.current = 0;
  }
  if (visible){
    if (safeTimer.current) limpiarTimer();
    safeTimer.current = window.setTimeout(limpiarTimer,300)
  }

  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    if (!safeTimer.current){
      setPing(true)
      setTimeout(() => {
        dispatch(cerrarSesion());
        queryClient.setQueryData(["rol-usuario"], null)
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