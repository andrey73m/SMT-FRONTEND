import { zodResolver } from "@hookform/resolvers/zod";
import { registroValidator, CamposRegistro } from "./registro";
import { loginValidator, CamposLogin } from "./login";
import { direccionValidator,CamposDireccion } from "./direccion";
import { productoValidator, CamposProducto } from "./producto";
import { codigoVerificacionValidator, CamposCodigoVerificacion } from "./codigo_verificacion";
import { CamposTicket,ticketValidator } from "./ticket";
import { servicioValidator } from "./servicio";
import { CamposServicio } from "./servicio";
import { gestionTicketValidator } from "./gestion_ticket";
import { CamposGestionTicket } from "./gestion_ticket";
import { calificacionValidator } from "./calificacion";
import { cuponValidator, ofertaValidator, CamposOferta, CamposCupon } from "./promocion";
import { raeeValidator, CamposRAEE } from "./raee";

export const registroResolver = zodResolver(registroValidator)
export const loginResolver = zodResolver(loginValidator)
export const direccionResolver = zodResolver(direccionValidator)
export const productoResolver = zodResolver(productoValidator)
export const codigoVerificacionResolver = zodResolver(codigoVerificacionValidator)
export const ticketResolver = zodResolver(ticketValidator)
export const servicioResolver = zodResolver(servicioValidator)
export const gestionTicketResolver = zodResolver(gestionTicketValidator)
export const calificacionResolver = zodResolver(calificacionValidator)
export const ofertaResolver = zodResolver(ofertaValidator)
export const cuponResolver = zodResolver(cuponValidator)
export const raeeResolver = zodResolver(raeeValidator)

export type {
  CamposRegistro,
  CamposLogin,
  CamposDireccion,
  CamposProducto,
  CamposCodigoVerificacion,
  CamposTicket,
  CamposServicio,
  CamposGestionTicket,
  CamposOferta,
  CamposCupon,
  CamposRAEE
}
