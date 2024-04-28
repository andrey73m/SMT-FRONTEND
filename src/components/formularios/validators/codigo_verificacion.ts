import {z} from "zod"
export const codigoVerificacionValidator = z.object({
  codigo: z.string().length(6, "El codigo debe tener 6 digitos")
})

export type CamposCodigoVerificacion = z.infer<typeof codigoVerificacionValidator>;