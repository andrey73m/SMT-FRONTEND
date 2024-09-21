import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataProducto } from "@/models/DataProducto";
import inventarioService from "@/services/inventarioService";
import { CamposInventario } from "@/components/formularios/validators";
import { notificarError, notificarExito } from "@/utils";

export const useMutacionCrearProducto = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:(data: CamposInventario) => inventarioService.crearProducto(data),
    onSuccess: (producto: DataProducto) => {
      notificarExito("Producto creado");
      callback()
      queryClient.setQueryData(["productos"], (productos: DataProducto[]) => productos?.concat(producto) )
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}

export const useMutacionActualizarProducto = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data, idproducto }: {data: CamposInventario, idproducto:string}) => inventarioService.actualizarProducto(data, idproducto),
    onSuccess: (updated) => {
      notificarExito("Producto actualizado")
      callback()

      queryClient.setQueryData(["producto"], updated)
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}

export const useMutacionEliminarProducto = (callback: ()=> void) => {
  return useMutation({
    mutationFn:(idproducto:string) => inventarioService.eliminarProducto(idproducto),
    onSuccess: () => {
      notificarExito("Producto eliminado")
      callback()
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}