import axios from "axios"
import { env } from "../environment"
import tokenService from "./tokenService"
import { CamposServicio } from "../components/formularios/validators"

export default {
  crearServicio: async (data: CamposServicio) => {
    const token = tokenService.getToken()
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/servicios`,data, { headers: { Authorization: token } })
    return res.data;
  },
  obtenerServicios: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/tickets/servicios`)
    return res.data;
  },
}