import { z } from "zod"

export const productoValidator = z.object({
  idproducto: z.string().uuid(),
  categoria: z.string().length(1, "Escoge una categoria valida"),
  marca: z.string().min(2, "Ingresa una marca valida"),
  nombre: z.string().min(2, "Ingresa un nombre valido"),
  disponibilidad: z.string().regex(/^\d+$/).min(1, "Ingresa valor valido"),
  precio: z.string().regex(/^\d+$/).min(3,"Ingresa un precio valido"),
  descripcion: z.string().min(10, "Ingresa una descripcion valida"),
})

export type CamposProducto = z.infer<typeof productoValidator>;