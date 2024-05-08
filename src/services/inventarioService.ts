import axios from "axios"
import { env } from "../environment"
import tokenService from "./tokenService"
import { CamposInventario } from "../components/formularios/validators"

export default {
  crearProducto: async (data: CamposInventario) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/inventario/${data.idcomponente}`,data, { headers: auth })
    return res.data;
  },
  obtenerProducto: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/inventario`)
    return res.data;
  },
}