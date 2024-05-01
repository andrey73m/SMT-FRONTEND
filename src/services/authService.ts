import axios from "axios"
import { env } from "../environment"
import { CamposCodigoVerificacion, CamposLogin, CamposRegistro } from "../components/formularios/validators"
import { AxiosError } from "axios"

import tokenService from "./tokenService"

export default {
  registrar: async (data: CamposRegistro) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/register`,data)
    return res.data;
  },

  registrarRol: async (data: CamposRegistro) => {
    const token = tokenService.getToken()
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/register/${data.rol}`, data, { headers:{ Authorization:token } })
    return res.data;
  },

  login: async(data:CamposLogin) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/login`,data)
    return res.data;
  },
  getRol: async () => {
    const token = tokenService.getToken()
    const res = await axios.get(`${env.BACKEND_ROOT}/auth/rol`,{ headers:{ Authorization: token } })
    return res.data;
  },

  verificarCodigo: async(data:CamposCodigoVerificacion, id: string) => {
    try{
      const res = await axios.post(`${env.BACKEND_ROOT}/auth/verification/${id}`,data)
      return res.data;
    }catch(e){
      const error = e as AxiosError;
      return { error: error.response }
    }
  },
  reenviarCodigo: async(id: string) => {
    try{
      const res = await axios.post(`${env.BACKEND_ROOT}/auth/resendcode/${id}`)
      return res.data;
    }catch(e){
      const error = e as AxiosError;
      return { error: error.response }
    }
  }
}

// export const crearDireccion = async(data: CamposDireccion) => {
//   try{
//     const token = cookies.get("token")
//     const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones`, data, { headers: { Authorization: token } })
//     return res.data;
//   }catch(e){
//     const error = e as AxiosError;
//     return { error: error.response }
//   }
  
// }