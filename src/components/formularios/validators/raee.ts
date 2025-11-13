import { z } from "zod";

export const raeeValidator = z.object({
  tipo_dispositivo: z.string().min(2, "Selecciona un tipo de dispositivo válido"),
  estado_equipo: z.string().min(2, "Selecciona el estado del equipo"),
  peso_aproximado: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Ingresa un peso válido")
    .transform((v) => Number(v))
    .refine((val) => val > 0 && val < 200, "El peso debe ser mayor que 0 y menor que 200 kg"),
  tipo_disposicion: z.string().min(2, "Selecciona el tipo de disposición"),
  punto_entrega: z.string().min(2, "Selecciona un punto de entrega"),
  direccion: z
    .string()
    .uuid("Selecciona una dirección válida")
    .optional(), // Solo requerida si el punto de entrega es "Recolección programada"
  comentarios: z
    .string()
    .max(300, "Los comentarios no deben superar los 300 caracteres")
    .optional()
})
.refine(
  (data) => {
    // Si el usuario elige "Recolección a domicilio", la dirección debe estar presente
    if (data.punto_entrega === "Recolección a domicilio") {
      return !!data.direccion;
    }
    return true;
  },
  {
    message: "Debes seleccionar una dirección si elegiste recolección programada",
    path: ["direccion"]
  }
);

export type CamposRAEE = z.infer<typeof raeeValidator>;