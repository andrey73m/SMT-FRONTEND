import { z } from "zod"

export const componenteValidator = z.object({
  categoria: z.string().length(1, "Escoge una categoria valida"),
  marca: z.string().min(2, "Ingresa una marca valida"),
  nombre: z.string().min(2, "Ingresa un nombre valido"),
  descripcion: z.string().min(10, "Ingresa una descripcion valida"),
})

export type CamposComponente = z.infer<typeof componenteValidator>;