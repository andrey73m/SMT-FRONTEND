import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { cerrarMenu } from "@/store/features/TopBar";
import useMenuLateral from "@/hooks/menuLateral";
import LogoPrincipal from "../icons/LogoPrincipal";
import cn from "@/cn";



const MenuFlotante = () => {
  const { abierto } = useMenuLateral()

  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(cerrarMenu())
  }
  return (
    <div className="text-white">
        
      <div onClick={handleClose}
        className={cn(" bg-gray-600/50 h-screen w-screen fixed top-0 right-0 backdrop-blur-sm transition-all z-50",{
          "hidden": !abierto
        })}/>
      <div className={cn("bg-violet-950 min-h-screen w-72 sm:w-96 fixed top-0  transition-all duration-100 z-50",{
        "left-0": abierto,
        "-left-96": !abierto
      })}>
        <div className="h-topbar flex w-full bg-purple-900 mb-5 justify-center">
          <LogoPrincipal/>
        </div>
        
        <div className="text-center">
          <div className="text-2xs m-1 hover:bg-indigo-400 cursor-pointer">Hola</div>
          <Link to="/" >
            <div className="text-2xs m-1  hover:bg-indigo-400 cursor-pointer">Inicio</div>
          </Link>

          <Link to="quienes-somos">
            <div className="text-2xs m-1  hover:bg-indigo-400 cursor-pointer">Sobre nosotros</div>
          </Link>
          <Link to="productos">
            <div className="text-2xs m-1  hover:bg-indigo-400 cursor-pointer">Productos</div>
          </Link>

        </div>
      </div>
    </div>

  )}

export default MenuFlotante;