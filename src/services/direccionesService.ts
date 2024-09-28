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

  crearDireccion: async (data: CamposDireccion, idusuario_gestionado?: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar`, data, { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },
  
  obtenerDireccion: async (idusuario_gestionado?: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar`, { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },

  actualizarDireccion: async (data:CamposDireccion, idusuario_gestionado?:string, iddireccion?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${iddireccion}`, data , { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },

  eliminarDireccion: async (idusuario_gestionado?: string, iddireccion?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${iddireccion}`, { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },

  hacerDireccionPredeterminada: async(idireccion?:string, idusuario_gestionado?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/hacer-predeterminada/${idireccion}`, { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },

  actualizarDireccionAdmin: async (idusuario_gestionado: string, iddireccion:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${iddireccion}`, { headers: { ...auth, idusuario_gestionado } })
    return res.data;
  },

}

