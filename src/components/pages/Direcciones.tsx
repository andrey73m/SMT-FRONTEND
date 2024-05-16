import { ImagenTitulo } from "../layout/FormatoImagenes";
import Direcciones from "../views/direcciones/VistaDirecciones";
import { VistaRol } from "../wrappers";

const PaginaDirecciones = () => {
  return (
    <>
      <ImagenTitulo titulo="Direcciones" urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcTru3EjNUqfuFFOJ1kZMxvKLTyeqmzXgFOn7gJvqig&s"/>
      <VistaRol roles={["cliente","admin"]}>
        <Direcciones/>
      </VistaRol>
    </>
  );
}
 
export default PaginaDirecciones;