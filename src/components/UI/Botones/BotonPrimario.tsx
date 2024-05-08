import cn from "../../../cn";
import Boton, { BotonProps } from "./Boton";


 
const BotonPrimario = ({ className,...props }: BotonProps) => {
  return (
    <Boton {...props} className={cn("bg-violet-700 hover:bg-violet-500 ", className)}/>
  );
}
 
export default BotonPrimario;