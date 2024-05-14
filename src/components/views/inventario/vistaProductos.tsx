import { useQuery } from "@tanstack/react-query";
import inventarioService from "../../../services/inventarioService";
import Spinner from "../../UI/Spinner";

interface DataInventario{
    idproducto: string,
    idcomponente: string,
    sku: string,
    disponibilidad: number,
    precio: number,
    idcategoria: number,
    marca: string,
    nombre: string,
    descripcion: string,
    url_imagen: string
}

const Productos = () => {
  const productosQuery = useQuery<DataInventario[]>({
    queryKey: ["productos"],
    queryFn: inventarioService.obtenerProducto,
  })
  if (productosQuery.isLoading) return <Spinner/>
  return (
    <>
      {
        productosQuery.data?.map((producto) =>

          <div key={producto.idproducto} className="container mx-auto p-10">

         
            <div className="p-5 rounded-xl shadow-md cursor-pointer hover:shadow-2xl">
                  
              <div className="transition-all h-72 w-full mb-4 lg:mb-0 lg:w-80  bg-center bg-cover mx-auto"
                style={{ backgroundImage: `url('${producto.url_imagen}')` }}> </div>

              <div className="m-6">
                <h3 className="font-bold text-2xl line-clamp-1">{producto.nombre}</h3>
                <p className="font-light text-2xl m-2">Unidades disponibles: {producto.disponibilidad}</p>
                <p className="font-light text-2xl m-2">Precio: ${producto.precio}</p>
              </div>
              
            </div>
          </div>
        )
      }
    </> );
}

export default Productos;
