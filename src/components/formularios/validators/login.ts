import { z } from "zod"

export const loginValidator = z.object({
  correo: z.string().email("Escribe un correo valido"),
  clave: z.string().min(8, "La contraseña debe ser mayor a 8 caracteres")
})

export type CamposLogin = z.infer<typeof loginValidator>;