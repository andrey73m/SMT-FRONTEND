import { useSesion } from "../../../hooks";
import IconoUsuario from "../../icons/Usuario";

const InfoUsuario = () => {
  const { info } = useSesion()
  return (
    <div className="flex px-4 bg-indigo-950 border-r-2 border-dotted border-x-indigo-300">

      <div className="flex p-0.5 h-full mr-2">
        <IconoUsuario />
      </div>
      <div className="hidden md:flex flex-col justify-center h-full transition-all">
        <p className="text-xs">{info.nombres} {info.apellidos}</p>
        <p className="text-indigo-300 text-xs">{info.nombreUsuario}</p>

      </div>
    </div>
  );
}
 
export default InfoUsuario;