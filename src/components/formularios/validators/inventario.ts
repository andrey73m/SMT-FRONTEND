import { z } from "zod"

export const inventarioValidator = z.object({
  idcomponente: z.string().regex(/^\d+$/, "Escoge un producto valido"),
  SKU: z.string().min(6, "Ingrese un SKU valido"),
  disponibilidad: z.number().int("Ingresa valor valido"),
  precio: z.number().int("Ingresa un precio valido"),
})

export type CamposInventario = z.infer<typeof inventarioValidator>;