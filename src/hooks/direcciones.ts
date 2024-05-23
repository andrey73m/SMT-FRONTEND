import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataDireccion from "@/models/DataDireccion";
import direccionesService from "@/services/direccionesService";
import { notificarError, notificarExito } from "@/utils";
import { useParams } from "react-router-dom";
import { CamposDireccion } from "@/components/formularios/validators";


const CompletarDireccion = async (direccion: DataDireccion) => {
  const { departamento, municipio } = await direccionesService.obtenerDepartamentoMunicipio(direccion.c_dane_municipio)
  direccion.departamento = departamento
  direccion.municipio = municipio
  return direccion
}

const CompletarDirecciones = async (data: DataDireccion[]) => {
  return Promise.all(data.map(async d => {
    return CompletarDireccion(d)
  }))
}

export const useQueryDirecciones = (idusuario?: string) => {
  return useQuery<DataDireccion[]>({
    queryKey: ["direcciones"],
    queryFn: async () => {
      const data: DataDireccion[] = await direccionesService.obtenerDireccion(idusuario)
      return CompletarDirecciones(data);
      
    },
    refetchOnWindowFocus: false,
    retry:0
  })
}

export const useMutacionCrearDireccion = (callback: ()=>void) => {
  const { idusuario } = useParams()
  const queryClient = useQueryClient()
  return useMutation({
<<<<<<< HEAD
    mutationFn:(data: CamposDireccion) => direccionesService.crearDireccion(data, idusuario),
    onSuccess: (direccion: DataDireccion) => {
=======
    mutationFn:direccionesService.crearDireccion,
    onSuccess: async (direccion: DataDireccion) => {
>>>>>>> f83d4077a008512b317784154bbfeedfbceed8c3
      notificarExito("Direccion creada");
      callback()
      const direccionCompleta = await CompletarDireccion(direccion);
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => {
        if (direccionCompleta.predeterminada) data = data.map(d => ({ ...d, predeterminada: false }))
        return data.concat(direccionCompleta)
      })
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
      const direccionCompleta = await CompletarDireccion(updated);
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => data?.map(direccion => direccion.iddireccion === direccionCompleta.iddireccion ? direccionCompleta : direccion))
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
    onSuccess: async (updated) => {
      notificarExito("Dirección predeterminada actualizada")
      callback()
      const direccionCompleta = await CompletarDireccion(updated);
      queryClient.setQueryData(["direcciones"], (data: DataDireccion[]) => data?.map(direccion => {
        if (direccion.iddireccion === updated.iddireccion) return direccionCompleta
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
