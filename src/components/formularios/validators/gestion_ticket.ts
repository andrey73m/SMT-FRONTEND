import { z } from "zod"



export const gestionTicketValidator = z.object({
  idtipo_servicio: z.string().regex(/^\d+$/, "Escoge un tipo de servicio valido"),
  prioridad: z.string()
})

export type CamposGestionTicket = z.infer<typeof gestionTicketValidator>;