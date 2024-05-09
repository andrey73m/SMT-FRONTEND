import { z } from "zod"

export const inventarioValidator = z.object({
  idcomponente: z.string().min(2,"Escoge una componente valido"),
  sku: z.string().min(6, "Ingrese un SKU valido"),
  disponibilidad: z.string().regex(/^\d+$/).min(1, "Ingresa valor valido"),
  precio: z.string().regex(/^\d+$/).min(3,"Ingresa un precio valido"),
})

export type CamposInventario = z.infer<typeof inventarioValidator>;