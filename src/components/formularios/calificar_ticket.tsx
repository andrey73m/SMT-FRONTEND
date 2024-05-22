import { FormProvider, useForm } from "react-hook-form"
import { calificacionResolver } from "./validators";
import ErrorFormulario from "./Error"
import { BotonPrimario } from "../UI/Botones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CamposCalificacion } from "./validators/calificacion";
import ticketService from "@/services/ticketService";
import { FormularioProps } from "./PropsFormulario";
import { DataTicket } from "@/models";
import { notificarError, notificarExito } from "@/utils";
import EstrellasFeedBackForm from "./EstrellasFeedBackForm";

interface FormularioCalificacionProps extends FormularioProps{
  ticket: DataTicket
}


const FormularioCalificacion = ({ ticket }: FormularioCalificacionProps) => {
  const metodos = useForm<CamposCalificacion>(
    {
      defaultValues: {
        comentario: "",
        valor: 0
      },
      resolver: calificacionResolver
    }

  )
  const { register, handleSubmit, formState: { errors } } = metodos;
  const queryClient = useQueryClient()
  const mutacionCalificar = useMutation({
    mutationFn: (data:CamposCalificacion) => ticketService.calificarTicket(data, ticket.idticket),
    onSuccess: (ticketCalificado: DataTicket) => {
      notificarExito("Ticket calificado")
      queryClient.setQueryData(["tickets"], (data: DataTicket[]) =>
        data.map(t => t.idticket === ticketCalificado.idticket ? ticketCalificado : t)
      )
    },
    onError:() => {
      notificarError("No se pudo calificar esa vaina")
    }
  })
  const onSubmit = (data: CamposCalificacion) => {
    mutacionCalificar.mutate(data)
    console.log(data)
  }
  return (
    <FormProvider {...metodos}>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white w-full flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">Califica el servicio</h1>
        {errors.valor && <ErrorFormulario>{errors.valor.message}</ErrorFormulario>}
        <EstrellasFeedBackForm  {...register("valor")} max={5} />
        {errors.comentario && <ErrorFormulario>{errors.comentario.message}</ErrorFormulario>}

        <textarea className="grow min-h-32 p-2 w-full focus:outline-none focus:border-violet-700 border-2 rounded-lg"  {...register("comentario")} placeholder="Comentario" />

        <BotonPrimario type="submit" >Enviar</BotonPrimario>

      </form>
    </FormProvider>
  )

}
export default FormularioCalificacion;