import { NavLink, NavLinkProps } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { cerrarMenu } from "@/store/features/TopBar";
import useMenuLateral from "@/hooks/menuLateral";
import LogoPrincipal from "../icons/LogoPrincipal";
import cn from "@/cn";
import { VistaRol } from "../wrappers";


const LinkMenu = ({ to,children }:NavLinkProps) => {
  return (
    <NavLink className={({ isActive }) => {
      return cn("text-2xs w-full  text-white text-xl hover:bg-indigo-400 cursor-pointer p-2",{
        "bg-white text-indito-800 hover:bg-indigo-100": isActive
      })
    }} to={to} >
      {children}
    </NavLink>
  )
}

const MenuFlotante = () => {
  const { abierto } = useMenuLateral()

  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(cerrarMenu())
  }
  return (
    <div onClick={handleClose} className="">
        
      <div
        className={cn(" bg-gray-600/50 h-screen w-screen fixed top-0 right-0 backdrop-blur-sm transition-all z-50",{
          "hidden": !abierto
        })}/>
      <div className={cn("bg-violet-950 min-h-screen w-72 sm:w-96 fixed top-0  transition-all duration-100 z-50",{
        "left-0": abierto,
        "-left-96": !abierto
      })}>
        <div className="h-topbar flex w-full bg-purple-900 justify-center">
          <LogoPrincipal />
        </div>
        
        <div className="flex flex-col text-center">
          <LinkMenu to="/" >
            Inicio
          </LinkMenu>
          <VistaRol>
            <LinkMenu to="/tickets" >
            Tickets
            </LinkMenu>

          </VistaRol>
          <VistaRol roles={["admin"]}>
            <LinkMenu to="/registro" >
              Registrar
            </LinkMenu>
          </VistaRol>
          <LinkMenu to="productos">
            Productos
          </LinkMenu>

          <VistaRol roles={["cliente"]}>
            <LinkMenu to="direcciones">
            Direcciones
            </LinkMenu>
          </VistaRol>

          <LinkMenu to="quienes-somos">
            Sobre nosotros
          </LinkMenu>

        </div>
      </div>
    </div>

  )}

export default MenuFlotante;