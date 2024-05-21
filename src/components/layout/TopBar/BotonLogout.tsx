import { useRef, useState } from "react";
import LogOut from "@/components/icons/LogOut";
import BotonTopBar from "./Boton";
import { useAppDispatch, useAppSelector } from "@/store";
import { cerrarSesion } from "@/store/features/sesion";
import { useQueryClient } from "@tanstack/react-query";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
 
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
        queryClient.invalidateQueries({ queryKey:["rol-usuario"] })
      }, 300);
    }
  }
  const [ping, setPing] = useState(false)
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)

  return (
    <>
      <DialogoConfirmar ejecutarAccion={logoutHandler} titulo="¿Estás seguro cerrar sesión?" ref= {referenciaConfirmacion}/>
      <BotonTopBar className="w-12" onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)} >
      

        <LogOut className="hover:text-rose-600 transition-colors w-12" ping={ping} />
      </BotonTopBar>
    </>
  );
}
 
export default BotonLogout;