import axios from "axios";
import { CamposTicket } from "@/components/formularios/validators";
import { env } from "@/environment";
import tokenService from "./tokenService";

export default{
  createTicketEmail: async (data: CamposTicket) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/email`, data)
    return res.data;
  },
  createTicket: async (data: CamposTicket) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets`, data, { headers: auth })
    return res.data;
  },
  getClientTicket: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tickets/gestionar/${id}`, { headers: auth })
    return res.data;
  },
  getTickets: async (params?: object) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tickets/gestionar`, { headers: auth, params })
    return res.data;
  },
  aceptarTicket: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/aceptar/${id}`,{}, { headers: auth })
    return res.data;
  }
}