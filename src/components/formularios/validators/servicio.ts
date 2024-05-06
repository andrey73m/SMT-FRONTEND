import { z } from "zod"

export const servicioValidator = z.object({
  tipo_servicio: z.string().min(2, "Escribe un nombre de servicio valido" ),
  descripcion: z.string().min(10,"Ingresa una descripción" ),
})

export type CamposServicio = z.infer<typeof servicioValidator>;