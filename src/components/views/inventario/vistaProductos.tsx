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
        productosQuery.data?.map((producto,i) =>

          <div key={producto.idproducto} className="container mx-auto">

            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-xl shadow-lg">
                <div className="p-5 flex flex-col">
                  
                  <div className="transition-all lg:rounded-full h-80 w-full mb-4 lg:mb-0 lg:w-80 bg-image bg-center bg-cover mx-12"
                    style={{ backgroundImage: `url('${producto.url_imagen}')` }}> </div>

                  <div>
                    <h3 className="font-bold text-4xl">{producto.nombre}</h3>
                    <p className="text-3xl">Unidades disponibles: {producto.disponibilidad}</p>
                    <p className="text-3xl">Precio: ${producto.precio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </> );
}

export default Productos;
