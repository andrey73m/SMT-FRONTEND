import { useMutation, useQueryClient } from "@tanstack/react-query";

import DataDireccion from "@/models/DataDireccion";
import direccionesService from "@/services/direccionesService";
import { notificarError, notificarExito } from "@/utils";
import { useParams } from "react-router-dom";
import { CamposDireccion } from "@/components/formularios/validators";


export const useMutacionCrearDireccion = (callback: ()=>void) => {
  const { idusuario } = useParams()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:(data: CamposDireccion) => direccionesService.crearDireccion(data, idusuario),
    onSuccess: (direccion: DataDireccion) => {
      notificarExito("Direccion creada");
      callback()
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => data?.concat(direccion))
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}

export const useMutacionActualizarDireccion = (callback: ()=>void) => {
  const { idusuario } = useParams()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data, iddireccion }: {data:CamposDireccion, iddireccion:string}) =>
      direccionesService.actualizarDireccion(data,idusuario, iddireccion),
    onSuccess: (updated) => {
      notificarExito("Direccion actualizada")
      callback()
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => data?.map(direccion => direccion.iddireccion === updated.iddireccion ? updated : direccion))
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}

export const useMutacionActualizarPredeterminada = (callback: ()=>void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: direccionesService.hacerDireccionPredeterminada,
    onSuccess: (updated) => {
      notificarExito("Dirección predeterminada actualizada")
      callback()
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => data?.map(direccion => {
        if (direccion.iddireccion === updated.iddireccion) return updated
        if (direccion.predeterminada) direccion.predeterminada = false
        return direccion
      }))
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}


export const useMutacionEliminarDireccion = () => {
  const { idusuario } = useParams()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:(iddireccion:string) => direccionesService.eliminarDireccion(idusuario,iddireccion),
    onSuccess: (deleted) => {
      notificarExito("Direccion eliminada")
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) =>
        data.filter(direccion => direccion.iddireccion !== deleted.iddireccion)
      )
    },
    onError: (error) => {
      const e = error as any
      notificarError(e.response?.data.error);
    }
  })
}
