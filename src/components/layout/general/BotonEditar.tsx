import IconoEditar from "@/components/icons/Editar";
import BotonTabla from "./BotonTabla";
 
const BotonEditar = ({ ...props }) => {
  return (
    <BotonTabla {...props}>
      <IconoEditar/>
    </BotonTabla>
  );
}
 
export default BotonEditar;