import axios from "axios"
import { env } from "@/environment"
import { AxiosError } from "axios"
import { CamposDireccion } from "@/components/formularios/validators"
import tokenService from "@/tokenService"


export default {
  crearDireccion: async (data: CamposDireccion) => {
    try{
      const token = tokenService.getToken()
      const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones`, data, { headers: { Authorization: token } })
      return res.data;
    }catch(e){
      const error = e as AxiosError;
      return { error: error.response }
    }
  },
  obtenerDireccion: async () => {
    const token = tokenService.getToken()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones`, { headers: { Authorization: token } })
    return res.data;
  },
}

