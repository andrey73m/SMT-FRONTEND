import { DataProducto } from "@/models/DataProducto";
import { formatoPrecio } from "@/utils";
import { useNavigate } from "react-router-dom";

interface TarjetaProductoProps {
  producto: DataProducto
}
 
const TarjetaProducto = ({ producto }: TarjetaProductoProps) => {

  const navigate = useNavigate()

  return (
    <>
      <div className="py-5 rounded-xl shadow-md cursor-pointer hover:shadow-2xl bg-white min-w-80" onClick={() => navigate(`/productos/${producto.idproducto}`)}>
        <div className=" lg:w-80 h-80 p-4 mx-auto">

          <div className="transition-all mb-4 h-full w-full lg:mb-0 bg-center bg-cover mx-auto"
            style={{ backgroundImage: `url('${producto.url_imagen}')` }}/>

        </div>
        <div className="p-6 *:leading-10">
          <h3 className="font-bold text-2xl line-clamp-1">{producto.nombre}</h3>
          <p className="font-light text-2xl m-2">Unidades disponibles: {producto.disponibilidad}</p>
          <p className="font-light text-2xl m-2">Precio: {formatoPrecio.format(producto.precio)}</p>
        </div>
      </div>
    </>
  );
}
 
export default TarjetaProducto;