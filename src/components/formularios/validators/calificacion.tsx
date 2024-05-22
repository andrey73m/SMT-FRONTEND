import { z } from "zod"
export const calificacionValidator = z.object({
  valor: z.number().min(1, "Debe dar alguna calificación").max(5,"La calificacion no puede ser mayor a 5"),
  comentario: z.string().optional()
})

export type CamposCalificacion = z.infer<typeof calificacionValidator>;