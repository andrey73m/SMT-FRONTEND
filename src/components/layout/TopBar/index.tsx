
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
import ProductosCarrito from "@/components/views/carritoCompras/ProductosCarrito";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useMutacionOnline } from "@/hooks/online";
import { socketService } from "@/services/socketService";
import { DataMensajeRecibido } from "@/models/Conversacion";
import { useQueryClient } from "@tanstack/react-query";
const TopBar = () => {

  const { haySesion } = useSesion()
  const dispatch = useAppDispatch()
  const { visible } = useAppSelector(state => state.topBar)
  const { invalidarOnline } = useMutacionOnline()
  const queryClient = useQueryClient();
  useEffect(() =>
    () => {dispatch(resetTobBar())}
  ,[])
  useEffect(() => {
    const onMessage = (mensaje: DataMensajeRecibido) => {
      queryClient.setQueryData<DataMensajeRecibido[]>(["mensajes-conversacion"], (mensajes) => {
        if (!mensajes) return [mensaje]
        return mensajes.concat(mensaje)
      })
    }

    socketService.on("chat:mensaje-nuevo", onMessage)
    socketService.on("cambio-en-online",invalidarOnline)
    
    return () => {
      socketService.removeListener("chat:mensaje-nuevo")
      socketService.removeListener("cambio-en-online")
    }
  }, [])
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
      <VistaRol roles={["cliente"]}>
        <ProductosCarrito/>

      </VistaRol>
      <MenuFlotante />
      <ToastContainer autoClose={5000} />
    </>
  )
}

export default TopBar;