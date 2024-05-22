import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataProducto } from "@/models/DataProducto";
import inventarioService from "@/services/inventarioService";
import { useParams } from "react-router-dom";
import { CamposInventario } from "@/components/formularios/validators";
import { notificarError, notificarExito } from "@/utils";

export const useMutacionCrearComponente = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:({ data, idcomponente }:{data: CamposInventario, idcomponente:string}) => inventarioService.crearProducto(data, idcomponente),
    onSuccess: (producto: DataProducto) => {
      notificarExito("Producto creado");
      callback()
      queryClient.setQueryData(["productos"], (data: DataProducto[]) => data?.concat(producto))
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
      queryClient.setQueryData(["productos"], (data: DataProducto[]) => data?.map(producto => producto.idproducto === updated.idproducto ? updated : producto))
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}

export const useMutacionEliminarProducto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:(idproducto:string) => inventarioService.eliminarProducto(idproducto),
    onSuccess: (deleted) => {
      notificarExito("Producto eliminado")
      queryClient.setQueryData(["productos"], (data: DataProducto[]) =>
        data.filter(producto => producto.idproducto !== deleted.idproducto)
      )
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}