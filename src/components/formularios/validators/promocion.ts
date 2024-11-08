import { z } from "zod"

export const ofertaValidator = z.object({
  asunto: z.string().min(5, "Debe contener al menos 5 carácter").max(70, "El asunto debe tener máximo 70 carácteres"),
  descripcion: z.string().min(10, "La descripcion debe tener mínimo 3 carácteres"),
  porcentaje: z.string({ message: "El porcentaje no es válido" })
    .transform(v => Number(v))
    .refine(val => val > 0 && val <= 100, "El valor no está entre 0 y 100"),

  fecha_inicio: z.string().date("La fecha no es válida"),
  fecha_fin: z.string().date("La fecha no es válida"),
  idcategoria: z.string().regex(/^\d+$/).optional(),
  idproducto: z.string().uuid().optional(),
}).refine(
  (data) => (data.idcategoria || data.idproducto) && !(data.idcategoria && data.idproducto)
).refine(
  //validar que la fecha fin sea mayor que la fecha inicio
  (data) => {
    const inicio = new Date(data.fecha_inicio);
    const fin = new Date(data.fecha_fin);
    return fin > inicio;
  }
);
export type CamposOferta = z.infer<typeof ofertaValidator>;


export const cuponValidator = z.object({
  idcupon: z.string().uuid(),
  asunto: z.string().max(30, "El asunto debe tener máximo 30 carácteres"),
  descripcion: z.string().min(10, "La descripcion debe tener mínimo 3 carácteres"),
  porcentaje: z.number({ message: "El porcentaje no es válido" }).int().gt(0).max(100),
  cantidad: z.number({ message: "La cantidad no es válida" }).int().min(1),
  duracion: z.number({ message: "La duración debe ser de al menos un día" }).min(1).int(),
  min_compras: z.number({ message: "El mínimo de compras debe ser positivo" }).min(0).int(),
  min_gastado: z.number({ message: "El mínimo gastado debe ser positivo" }).min(0).int(),
}).refine(
  (data) => (data.porcentaje || data.cantidad) && !(data.porcentaje && data.cantidad)
)

export type CamposCupon = z.infer<typeof cuponValidator>;