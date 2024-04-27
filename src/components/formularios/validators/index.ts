import { zodResolver } from "@hookform/resolvers/zod";
import { registroValidator, CamposRegistro } from "./registro";
import { loginValidator, CamposLogin } from "./login";
import { direccionValidator,CamposDireccion } from "./direccion";
import { componenteValidator, CamposComponente } from "./componente";
import { inventarioValidator, CamposInventario } from "./inventario";

const registroResolver = zodResolver(registroValidator)

export {
  registroResolver
}

export type {
  CamposRegistro
}

const loginResolver = zodResolver(loginValidator)

export {
  loginResolver
}

export type {
  CamposLogin
}

const direccionResolver = zodResolver(direccionValidator)

export {
  direccionResolver
}

export type {
  CamposDireccion
}

const componenteResolver = zodResolver(componenteValidator)

export {
  componenteResolver
}

export type {
  CamposComponente
}

const inventarioResolver = zodResolver(inventarioValidator)

export {
  inventarioResolver
}

export type {
  CamposInventario
}




