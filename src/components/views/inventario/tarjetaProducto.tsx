import cn from "@/cn";
import { DataProducto } from "@/models/DataProducto";
import { formatoPrecio } from "@/utils";

interface TarjetaProductoProps {
  producto: DataProducto,
  className?: string
}
 
const TarjetaProducto = ({ producto, className }: TarjetaProductoProps) => {

  
  return (
    <>
      <div className={cn("py-5 border-2 border-gray-200 rounded-xl shadow-md bg-white min-w-64 max-w-96", className)}>
        <div className=" lg:w-72 h-72 p-4 mx-auto">

          <div className="transition-all mb-4 h-full w-full lg:mb-0 bg-center bg-cover mx-auto"
            style={{ backgroundImage: `url('${producto.url_imagen}')` }}/>

        </div>
        <div className="p-6 *:leading-10">
          <h3 className="font-bold text-xl line-clamp-1">{producto.nombre}</h3>
          <p className={cn("text-2xl m-1 ", {
            "text-teal-400": producto.disponibilidad > 0
          })}>Unidades disponibles: {producto.disponibilidad}</p>
          <span className={cn("m-1 text-xl",{
            "font-bold text-3xl": !producto.descuento,
            "font-light line-through": producto.descuento
          })}>{formatoPrecio.format(producto.precio)}</span>
          {!!producto.descuento &&
          <span className={("m-1 text-xl text-purple-600")}>-{producto.descuento}% Desc.</span>
          }
          {!!producto.descuento && producto.precio_final &&
            <p className="text-3xl m-1 font-bold">{formatoPrecio.format(producto.precio_final)}</p>
          }
        </div>
      </div>
    </>
  );
}
 
export default TarjetaProducto;