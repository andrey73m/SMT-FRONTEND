import { Link } from "react-router-dom";
import Enlace from "../UI/Enlace";

interface MenuFlotanteProps {
  abierto: boolean;
}

const MenuFlotante = ({ abierto }: MenuFlotanteProps) => {
  
  return (
    <div>
      <div className={`${!abierto && "hidden"} bg-gray-600/50 h-screen w-full fixed top-0 
      left-0 right-0 backdrop-blur-sm `}></div>
        
      <div className={`${abierto ? "visible scale-w-72" : "invisible scale-w-0"} bg-indigo-600 min-h-screen w-72
      fixed top-0 right-0 transition-all duration-500`}>
        <div className="text-center py-3 text-2xl mb-7">SMT</div>
        
        <div className="text-center">
          <div className="text-2xs m-1 hover:bg-indigo-400 cursor-pointer">Hola</div>
          <Link to="/login">
            <Enlace>Inicia sesión aquí</Enlace>
          </Link>
        </div>
      </div>
    </div>

  )}

export default MenuFlotante;