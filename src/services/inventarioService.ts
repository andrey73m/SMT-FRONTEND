import axios from "axios"
import { env } from "../environment"
import tokenService from "./tokenService"
import { CamposInventario } from "../components/formularios/validators"

export default {
  crearProducto: async (data: CamposInventario, idcomponente?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/componentes/inventario/${idcomponente}`,data, { headers: auth })
    return res.data;
  },
  actualizarProducto: async (data:CamposInventario, idproducto?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/componentes/inventario/${idproducto}`,data, { headers: auth })
    return res.data;
  },
  eliminarProducto: async (idproducto?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/componentes/inventario/${idproducto}`, { headers: auth })
    return res.data;
  },
  obtenerProductos: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/componentes/inventario`)
    return res.data;
  },
  obtenerProducto: async (idproducto: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/componentes/inventario/${idproducto}`)
    return res.data;
  },
  obtenerEspecificacionesProducto: async (idproducto: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/componentes/especificaciones-componente/${idproducto}`)
    return res.data;
  },
}