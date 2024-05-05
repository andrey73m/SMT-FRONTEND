import axios from "axios"
import tokenService from "./tokenService"
import { env } from "../environment"

export default {
  getNotifications: async () => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/notificaciones`, { headers: auth })
    return res.data
  },
  setNotificationView: async (idnotificacion: string) => {
    const auth = tokenService.getAuthHeader()
    console.log("headers: ", auth)
    const res = await axios.post(`${env.BACKEND_ROOT}/notificaciones/marcar-vista/${idnotificacion}`, {},{ headers: auth } )
    return res.data
  }
}