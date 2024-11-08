import { DataCategoria, DataProducto } from "@/models/DataProducto"
import inventarioService from "@/services/inventarioService"
import { useQuery } from "@tanstack/react-query"

export const useCategoriasProductos = () => {
  const queryProductos =  useQuery<DataCategoria[]>({
    queryKey:["categorias-productos"],
    queryFn: inventarioService.obtenerCategorias,
    refetchOnWindowFocus:false
  })
  return queryProductos
}

export const useCategoriaProducto = (idcategoria: number) => {
  const queryProductos =  useQuery<DataCategoria>({
    queryKey:["info-productos-carrito"],
    queryFn: () => inventarioService.obtenerCategoria(idcategoria),
    refetchOnWindowFocus:false
  })
  return queryProductos
}


export const useInfoProducto = (idcategoria?: number, idproducto?: string) => {
  if (!idcategoria && !idproducto) {
    throw new Error("Debe proporcionarse al menos un idcategoria o idproducto");
  }
  // Lógica para la consulta según el id disponible
  const query = useQuery<{producto?: DataProducto, categoria?: DataCategoria}>({
    queryKey: idcategoria
      ? ["info-categoria", idcategoria]
      : ["info-producto", idproducto],
    queryFn: async () => {
      
      if (idcategoria)
        return { categoria: await inventarioService.obtenerCategoria(idcategoria) }
      else if (idproducto)
        return { producto: await inventarioService.obtenerProducto(idproducto) }

      throw new Error("No se pudo determinar la consulta adecuada.");
    },
    refetchOnWindowFocus: false,
  });

  return query;
};