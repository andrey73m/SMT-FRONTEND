import axios from "axios";
import { CamposTicket } from "../components/formularios/validators";
import { env } from "../environment";
import tokenService from "./tokenService";

export default{
  createTicketEmail: async (data: CamposTicket) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/email`, data)
    return res.data;
  },
  createTicket: async (data: CamposTicket) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets/email`, data, { headers: auth })
    return res.data;
  }
}