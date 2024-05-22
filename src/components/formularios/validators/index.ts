import { zodResolver } from "@hookform/resolvers/zod";
import { registroValidator, CamposRegistro } from "./registro";
import { loginValidator, CamposLogin } from "./login";
import { direccionValidator,CamposDireccion } from "./direccion";
import { componenteValidator, CamposComponente } from "./componente";
import { inventarioValidator, CamposInventario } from "./inventario";
import { codigoVerificacionValidator, CamposCodigoVerificacion } from "./codigo_verificacion";
import { CamposTicket,ticketValidator } from "./ticket";
import { servicioValidator } from "./servicio";
import { CamposServicio } from "./servicio";
import { gestionTicketValidator } from "./gestion_ticket";
import { CamposGestionTicket } from "./gestion_ticket";
import { calificacionValidator } from "./calificacion";

export const registroResolver = zodResolver(registroValidator)
export const loginResolver = zodResolver(loginValidator)
export const direccionResolver = zodResolver(direccionValidator)
export const componenteResolver = zodResolver(componenteValidator)
export const inventarioResolver = zodResolver(inventarioValidator)
export const codigoVerificacionResolver = zodResolver(codigoVerificacionValidator)
export const ticketResolver = zodResolver(ticketValidator)
export const servicioResolver = zodResolver(servicioValidator)
export const gestionTicketResolver = zodResolver(gestionTicketValidator)
export const calificacionResolver = zodResolver(calificacionValidator)

export type {
  CamposRegistro,
  CamposLogin,
  CamposDireccion,
  CamposComponente,
  CamposInventario,
  CamposCodigoVerificacion,
  CamposTicket,
  CamposServicio,
  CamposGestionTicket
}
