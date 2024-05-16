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

  crearDireccion: async (data: CamposDireccion) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones`, data, { headers: auth })
    return res.data;
  },
  
  obtenerDireccion: async () => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones`, { headers: auth })
    return res.data;
  },

  actualizarDireccion: async ({ id, data } : { id:string, data:CamposDireccion }) => {
    const auth = tokenService.getAuthHeader()
    console.log(auth)
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/${id}`, data , { headers: auth })
    return res.data;
  },

  eliminarDireccion: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/domicilio/direcciones/${id}`, { headers: auth })
    return res.data;
  },

  crearDireccionAdmin: async(data: CamposDireccion, idusuario:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}`, data, { headers: auth })
    return res.data;
  },

  obtenerDireccionAdmin: async(idusuario:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}`, { headers: auth })
    return res.data;
  },

  actualizarDireccionAdmin: async (idusuario: string, iddireccion:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}/${iddireccion}`, { headers: auth })
    return res.data;
  },

  eliminarDireccionAdmin: async (idusuario: string, iddireccion:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/domicilio/direcciones/administrar/${idusuario}/${iddireccion}`, { headers: auth })
    return res.data;
  },

}

