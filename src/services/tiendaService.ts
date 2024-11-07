import { env } from "@/environment"
import axios from "axios"
import tokenService from "./tokenService"
import { OrdenCompraRequest } from "@/models/DataOrdenCompra"

export default {
  agregarACarrito: async ({ idproducto,cantidad }:{idproducto: string, cantidad:number}) => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tienda/carrito/${idproducto}`, { cantidad },{ headers: authHeader })
    return res.data;
  },
  generarOrdenCompra: async (infoOrden: OrdenCompraRequest) => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tienda/orden-de-compra`,infoOrden,{ headers: authHeader })
    return res.data;
  },
  eliminarDeCarrito: async (idproducto: string) => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/tienda/carrito/${idproducto}`,{ headers: authHeader })
    return res.data;
  },
  obtenerProductosCarrito: async () => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tienda/carrito`,{ headers: authHeader })
    return res.data;
  },
  obtenerInfoProductosCarrito: async () => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tienda/carrito/info-productos`,{ headers: authHeader })
    return res.data;
  },
  obtenerOrdenes: async () => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tienda/orden-de-compra`,{ headers: authHeader })
    return res.data;
  }
}