import axios from "axios"
import { env } from "@/environment"
import tokenService from "./tokenService"
import { CamposServicio } from "@/components/formularios/validators"

export default {
  crearServicio: async (data: CamposServicio) => {
    const token = tokenService.getToken()
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/servicios`,data, { headers: { Authorization: token } })
    return res.data;
  },
  actualizarServicio: async ({ idservicio,data }:{idservicio:number,data: CamposServicio}) => {
    const token = tokenService.getToken()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/servicios/${idservicio}`,data, { headers: { Authorization: token } })
    return res.data;
  },
  eliminarServicio: async (idservicio:number) => {
    const token = tokenService.getToken()
    const res = await axios.delete(`${env.BACKEND_ROOT}/tickets/servicios/${idservicio}`, { headers: { Authorization: token } })
    return res.data;
  },
  obtenerServicios: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/tickets/servicios`)
    return res.data;
  },
}