import cn from "@/cn";
import { SpinnerPagina } from "@/components/UI";
import PuntoIndicador from "@/components/layout/PuntoIndicador";
import { useValidarOnline } from "@/hooks/online";
import { useClientes } from "@/hooks/usuarios";
import { DataUsuario } from "@/models/DataTicket";
import { Link } from "react-router-dom";

interface UsuarioProps {
  usuario: DataUsuario
}

interface ListaClientesProps {
  
}
 

const Usuario = ({ usuario }:UsuarioProps) => {
  const { isOnline: clienteOnline } = useValidarOnline(usuario.idusuario)
  return (
    <Link to={usuario.idusuario}>

      <div className="grow flex flex-col border-2 rounded-lg py-3 my-2 px-5 bg-white hover:bg-slate-300 cursor-pointer">
        <div className="flex gap-x-2 items-center">
          <PuntoIndicador className={cn("bg-green-300", {
            "bg-gray-200": !clienteOnline
          })} />
          <h3 className="text-2xl font-bold">{usuario.nombres} {usuario.apellidos}</h3>
        </div>
        <p className="text-slate-500 pl-6">{usuario.email}</p>
      </div>
    </Link>
  )
}


const ListaClientes = (props: ListaClientesProps) => {

  const { data: clientes, isLoading, isFetching, isSuccess } = useClientes()
  
  if (isFetching)return <SpinnerPagina/>
  return (
    <>
      {
        isSuccess && clientes &&
        clientes.map(usuario =>
          <Usuario usuario={usuario} key={usuario.idusuario}/>
        )
      }
    </>

  );
}
 
export default ListaClientes;