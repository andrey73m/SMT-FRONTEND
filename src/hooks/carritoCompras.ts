import { DataProductoCarrito } from "@/models"
import { DataProducto } from "@/models/DataProducto"
import tiendaService from "@/services/tiendaService"
import { useAppSelector } from "@/store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useEstadoCarritoCompras = () => {
  return useAppSelector(state => state.topBar.carritoCompras)
}

export const useInfoProductos = () => {
  const queryProductos =  useQuery<DataProducto[]>({
    queryKey:["info-productos-carrito"],
    queryFn: tiendaService.obtenerInfoProductosCarrito,
  })
  return queryProductos
}

export const useProductosCarritoCompras = () => {
  return useQuery<DataProductoCarrito[]>({
    queryKey:["productos-carrito"],
    queryFn: tiendaService.obtenerProductosCarrito,
    staleTime: 60000 * 5
  })
}

export const useMutacionesCarrito = () => {
  const { setDataCarrito } = useDataProductosCarritoCompras()
  const mutacionAgregarACarrito = useMutation({
    mutationFn: tiendaService.agregarACarrito,
    onSuccess: (actualizado: DataProductoCarrito) => {
      setDataCarrito()

    },
    onError: (e) => {

    }
  })
  const mutacionQuitar = useMutation({
    mutationFn: tiendaService.eliminarDeCarrito,
    onSuccess: setDataCarrito
  })

  return { mutacionAgregarACarrito, mutacionQuitar }
}

export const useDataProductosCarritoCompras = () => {
  const queryClient = useQueryClient()
  const dataCarrito = queryClient.getQueryData(["productos-carrito"]) as DataProductoCarrito[]
  const setDataCarrito = () => queryClient.invalidateQueries({ queryKey: ["productos-carrito"] })
  return { dataCarrito,setDataCarrito }
}

export const useDataProductosFiltrado = (idproducto: string) => {
  const { data:dataCarrito } = useProductosCarritoCompras()
  const [dataFiltrada, setDataFiltrada] = useState<DataProductoCarrito>();
  useEffect(() => {
    if (dataCarrito){
      console.log("filetrando")
      return  setDataFiltrada(dataCarrito.find(p => p.idproducto === idproducto))
    }
    
  }, [dataCarrito])

  return dataFiltrada
}