import { zodResolver } from "@hookform/resolvers/zod";
import { registroValidator, CamposRegistro } from "./registro";
import { loginValidator, CamposLogin } from "./login";
import { direccionValidator,CamposDireccion } from "./direccion";
import { componenteValidator, CamposComponente } from "./componente";
import { inventarioValidator, CamposInventario } from "./inventario";
import { codigoVerificacionValidator, CamposCodigoVerificacion } from "./codigo_verificacion";

const registroResolver = zodResolver(registroValidator)
const loginResolver = zodResolver(loginValidator)
const direccionResolver = zodResolver(direccionValidator)
const componenteResolver = zodResolver(componenteValidator)
const inventarioResolver = zodResolver(inventarioValidator)
const codigoVerificacionResolver = zodResolver(codigoVerificacionValidator)

export {
  registroResolver,
  loginResolver,
  direccionResolver,
  componenteResolver,
  inventarioResolver,
  codigoVerificacionResolver
}

export type {
  CamposRegistro,
  CamposLogin,
  CamposDireccion,
  CamposComponente,
  CamposInventario,
  CamposCodigoVerificacion
}
