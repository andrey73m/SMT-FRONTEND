import IconoEliminar from "@/components/icons/Eliminar";
import BotonTabla from "./BotonTabla";
interface BotonEliminarProps {
  
}
 
const BotonEliminar = ({ ...props }) => {
  return (
    <BotonTabla {...props}>
      <IconoEliminar/>
    </BotonTabla>
  );
}
 
export default BotonEliminar;