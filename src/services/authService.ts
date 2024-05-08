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
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/register/${data.rol}`, data, { headers: auth })
    return res.data;
  },

  login: async(data:CamposLogin) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/login`,data)
    return res.data;
  },
  getRol: async () => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/auth/rol`,{ headers: auth })
    return res.data;
  },

  verificarCodigo: async(data:CamposCodigoVerificacion, id: string) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/verification/${id}`,data)
    return res.data;

  },
  reenviarCodigo: async(id: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/auth/resendcode/${id}`)
    return res.data;

  },
  validarSesion: async() => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/auth/validar-sesion`,{ headers: auth })
    return res.data;

  }
}
