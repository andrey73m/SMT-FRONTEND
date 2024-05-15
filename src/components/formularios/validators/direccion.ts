import { z } from "zod"



export const direccionValidator = z.object({
  c_dane_departamento: z.string().regex(/^\d+$/, "Escoge un departamento valido"),
  c_dane_municipio: z.string().regex(/^\d+(\.\d+)?$/, "Escoge un municipio valido"),
  barrio: z.string().min(5, "Ingresa un barrio valido"),
  cadena_direccion: z.string().min(8, "La direccion debe ser mayor a 8 caracteres"),
  predeterminada: z.boolean({ message:"A" })
})

export type CamposDireccion = z.infer<typeof direccionValidator>;