import axios from "axios"
import tokenService from "./tokenService"
import { env } from "@/environment"
import { CamposOferta } from "@/components/formularios/validators"
import { PaginationOptions, PaginationResponse } from "@/models/Paginacion"
import { DataOferta, TOfertaOrdering } from "@/models/DataPromociones"

export default {
  crearOferta: async (data: CamposOferta) => {
    const token = tokenService.getToken()
    const res = await axios.post(`${env.BACKEND_ROOT}/productos/ofertas`,data, { headers: { Authorization: token } })
    return res.data;
  },
  actualizarOferta: (idoferta?: string) => async (data: CamposOferta) => {
    const token = tokenService.getToken()
    const res = await axios.put(`${env.BACKEND_ROOT}/productos/ofertas/${idoferta}`,data, { headers: { Authorization: token } })
    return res.data;
  },
  obtenerOfertas: async (nextParam: PaginationOptions<TOfertaOrdering>): Promise<PaginationResponse<DataOferta>> => {
    const token = tokenService.getToken()
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/ofertas`, { headers: {
      Authorization: token,
      pagination: JSON.stringify(nextParam)
    } })
    return res.data;
  },
  obtenerCupones: async () => {
    const token = tokenService.getToken()
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/cupones`, { headers: { Authorization: token } })
    return res.data;
  },
}