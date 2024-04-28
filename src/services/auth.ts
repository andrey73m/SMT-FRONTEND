import axios from "axios"
import { env } from "../environment"
import { CamposCodigoVerificacion, CamposLogin, CamposRegistro, CamposDireccion } from "../components/formularios/validators"
import { AxiosError } from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const registrar = async (data: CamposRegistro) => {
  try{
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/register`,data)
    return res.data;
  }catch(e){
    const error = e as AxiosError;
    return { error: error.response }
  }
}

export const login = async(data:CamposLogin) => {
  try{
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/login`,data)
    return res.data;
  }catch(e){
    const error = e as AxiosError;
    return { error: error.response }
  }
}

export const verificarCodigo = async(data:CamposCodigoVerificacion, id: string) => {
  try{
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/verification/${id}`,data)
    return res.data;
  }catch(e){
    const error = e as AxiosError;
    return { error: error.response }
  }
  
}
export const reenviarCodigo = async(id: string) => {
  try{
    const res = await axios.post(`${env.BACKEND_ROOT}/auth/resendcode/${id}`)
    return res.data;
  }catch(e){
    const error = e as AxiosError;
    return { error: error.response }
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