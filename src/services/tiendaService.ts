import { env } from "@/environment"
import axios from "axios"
import tokenService from "./tokenService"

export default {
  agregarACarrito: async ({ idproducto,cantidad }:{idproducto: string, cantidad:number}) => {
    const authHeader = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tienda/carrito/${idproducto}`, { cantidad },{ headers: authHeader })
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
}