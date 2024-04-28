import { z } from "zod"

export const loginValidator = z.object({
  email: z.string().email("Escribe un correo valido"),
  clave: z.string({ message: "La contraseña no es valida"} ),
})

export type CamposLogin = z.infer<typeof loginValidator>;