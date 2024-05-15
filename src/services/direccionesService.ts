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
}

