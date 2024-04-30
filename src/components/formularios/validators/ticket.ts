import { z } from "zod"

export const ticketValidator = z.object({
  email: z.string().email("El email no es valido").optional(),
  asunto: z.string().max(30, "El asunto no deberia tener mas de 30 caracteres"),
  contenido: z.string()

})

export type CamposTicket = z.infer<typeof ticketValidator>;