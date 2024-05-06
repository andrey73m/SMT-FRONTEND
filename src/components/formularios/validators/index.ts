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

const registroResolver = zodResolver(registroValidator)
const loginResolver = zodResolver(loginValidator)
const direccionResolver = zodResolver(direccionValidator)
const componenteResolver = zodResolver(componenteValidator)
const inventarioResolver = zodResolver(inventarioValidator)
const codigoVerificacionResolver = zodResolver(codigoVerificacionValidator)
const ticketResolver = zodResolver(ticketValidator)
const servicioResolver = zodResolver(servicioValidator)


export {
  registroResolver,
  loginResolver,
  direccionResolver,
  componenteResolver,
  inventarioResolver,
  codigoVerificacionResolver,
  ticketResolver,
  servicioResolver
}

export type {
  CamposRegistro,
  CamposLogin,
  CamposDireccion,
  CamposComponente,
  CamposInventario,
  CamposCodigoVerificacion,
  CamposTicket,
  CamposServicio,
}
