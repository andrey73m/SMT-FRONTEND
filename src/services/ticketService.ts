import axios from "axios";
import { CamposTicket } from "../components/formularios/validators";
import { env } from "../environment";

export default{
  createTicket: async (data: CamposTicket) => {
    const res = await axios.post(`${env.BACKEND_ROOT}/tickets`, data)
    return res.data;
  }
}