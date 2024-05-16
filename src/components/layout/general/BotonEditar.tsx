import IconoEditar from "@/components/icons/Editar";
import BotonTabla from "./BotonTabla";
interface BotonEditarProps {
  
}
 
const BotonEditar = ({ ...props }) => {
  return (
    <BotonTabla {...props}>
      <IconoEditar/>
    </BotonTabla>
  );
}
 
export default BotonEditar;