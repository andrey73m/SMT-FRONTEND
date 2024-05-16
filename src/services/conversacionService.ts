import axios from "axios";
import tokenService from "./tokenService";
import { env } from "@/environment";

export default {
  cargarMensajesConversacion: async (idticket: string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.get(`${env.BACKEND_ROOT}/chat/mensajes/${idticket}`, { headers: auth })
    return res.data;
  }
}