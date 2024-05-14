import axios from "axios"
import { env } from "../environment"
import tokenService from "./tokenService"
import { CamposInventario } from "../components/formularios/validators"

export default {
  crearProducto: async (data: CamposInventario) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/componentes/inventario/${data.idcomponente}`,data, { headers: auth })
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