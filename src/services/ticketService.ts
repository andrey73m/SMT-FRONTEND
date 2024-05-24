import axios from "axios";
import { CamposGestionTicket, CamposTicket } from "@/components/formularios/validators";
import { env } from "@/environment";
import tokenService from "./tokenService";
import { CamposCalificacion } from "@/components/formularios/validators/calificacion";

export default{
  createTicket: async (data: CamposTicket) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/email`, data, { headers: auth })
    return res.data;
  },
  getTicket: async (id?: string) => {
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
  },
  descartarTicketUsuario: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/gestionar/descartar/${id}`,{}, { headers: auth })
    return res.data;
  },
  reabrirTicket: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/gestionar/reabrir/${id}`,{}, { headers: auth })
    return res.data;
  },
  resolverTicket: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/gestionar/resolver/${id}`,{}, { headers: auth })
    return res.data;
  },
  solicitarReaperturaTicket: async (id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/solicitar-reapertura/${id}`,{}, { headers: auth })
    return res.data;
  },
  calificarTicket: async (data: CamposCalificacion,id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/calificar/${id}`,data, { headers: auth })
    return res.data;
  },
  gestionarTicket: async (data: CamposGestionTicket,id: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/tickets/gestionar/${id}`,data, { headers: auth })
    return res.data;
  },
  obtenerTicketConversacion: async (idticket?: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/tickets/ticket-conversacion/${idticket}`, { headers: auth })
    return res.data;
  }
}