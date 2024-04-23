import { registroValidator, CamposRegistro } from "./registro";
import { zodResolver } from "@hookform/resolvers/zod";

const registroResolver = zodResolver(registroValidator)

export {
  registroResolver
}

export type {
  CamposRegistro
}