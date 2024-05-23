import axios from "axios"
import { env } from "@/environment"
import { CamposDireccion } from "@/components/formularios/validators"
import tokenService from "./tokenService"

export default {
  obtenerDepartamentos: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/listadepartamentos`)
    return res.data
  },

  obtenerMunicipios: async (c_dane_departamento: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/listamunicipios/${c_dane_departamento}`)
    return res.data;
  },
  obtenerDepartamentoMunicipio: async (c_dane_municipio: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/departamento-municipio/${c_dane_municipio}`)
    return res.data;
  },

  crearDireccion: async (data: CamposDireccion, idusuario?: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}`, data, { headers: auth })
    return res.data;
  },
  
  obtenerDireccion: async (idusuario?: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}`, { headers: auth })
    return res.data;
  },

  actualizarDireccion: async (data:CamposDireccion, idusuario?:string, iddireccion?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}/${iddireccion}`, data , { headers: auth })
    return res.data;
  },

  eliminarDireccion: async (idusuario?: string, iddireccion?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}/${iddireccion}`, { headers: auth })
    return res.data;
  },

  hacerDireccionPredeterminada: async(idireccion?:string, idusuario?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/hacer-predeterminada/${idusuario}/${idireccion}`, { headers: auth })
    return res.data;
  },

  actualizarDireccionAdmin: async (idusuario: string, iddireccion:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}/${iddireccion}`, { headers: auth })
    return res.data;
  },

}

