import { z } from "zod"

export const registroValidator = z.object({
  nombres: z.string().min(2, "Deben haber al menos dos caracteres de nombre"),
  apellidos: z.string().min(2, "Deben haber al menos dos caracteres de apellidos"),
  email: z.string().email("Escribe un correo valido"),
  clave: z.string().min(8, "La contraseña debe ser mayor a 8 caracteres"),
  confirmarClave: z.string(),
  fecha_nac: z.string().date("La fecha de nacimiento no es valida")
}).refine(
  campos => {
    return campos.clave === campos.confirmarClave
  },
  {
    message: "Las contraseñas no coinciden",
    path: ["confirmarClave"]
  }
)

export type CamposRegistro = z.infer<typeof registroValidator>;