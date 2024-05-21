import { BotonPrimario } from "../UI/Botones";
import FormularioDireccion from "../formularios/direccion";
import AlternarFormulario from "../layout/AlternarFormulario";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import Direcciones from "../views/direcciones/VistaDirecciones";
import ListaClientes from "../views/usuarios/Clientes";
import { VistaRol } from "../wrappers";
import { useParams } from "react-router-dom";

const PaginaDirecciones = () => {

  const { idusuario } = useParams();
  return (
    <>
      <ImagenTitulo titulo="Direcciones" urlImagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWcTru3EjNUqfuFFOJ1kZMxvKLTyeqmzXgFOn7gJvqig&s"/>
      <div className="flex justify-center py-10 px-2">
        
        <div className="py-3 rounded-xl shadow-md bg-gray-200 w-full lg:w-2/4 tansition-all">
          <VistaRol roles={["cliente"]}>
            <h1 className="text-center mb-5 font-bold text-3xl">Configura tus direcciones</h1>
            <div className="flex justify-center ">
              <AlternarFormulario texto="Agrega una dirección" Formulario={FormularioDireccion} Boton={BotonPrimario}/>
            </div>
            <Direcciones/>
          </VistaRol>
          <VistaRol roles={["admin"]}>
            <h1 className="text-center mb-5 font-bold text-3xl">Direcciones de usuario</h1>
            {
              idusuario ?
                <Direcciones /> :
                <ListaClientes />
            }
          </VistaRol>
        </div>
      </div>
    </>
  );
}
 
export default PaginaDirecciones;