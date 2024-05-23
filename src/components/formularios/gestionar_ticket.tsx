import { FormProvider, useForm } from "react-hook-form"
import { gestionTicketResolver, CamposGestionTicket } from "./validators";
import ErrorFormulario from "./Error"
import QuerySelect from "./QuerySelect";
import { BotonPrimario } from "../UI/Botones";
import servicioService from "@/services/servicioService";
import ticketService from "@/services/ticketService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTicket } from "@/models";
import SelectLabel from "./SelectLabel";
import { CapitalizeString, notificarError } from "@/utils";


interface FormularioGestionarTicketProps {
  ticket: DataTicket
  primera?: boolean
}
const FormularioGestionarTicket = ({ ticket, primera }: FormularioGestionarTicketProps) => {
  const metodos = useForm<CamposGestionTicket>(
    {
      resolver: gestionTicketResolver
    }
  )
  const { register, handleSubmit, formState: { errors } } = metodos
  
  const queryClient = useQueryClient()
  const gestionMutation = useMutation({
    //TODO: DEVOLVER OBJETO COMPLETO
    mutationFn: (options: {data:CamposGestionTicket, idticket:string}) => ticketService.gestionarTicket(options.data,options.idticket),
    onSuccess: (updated:DataTicket) => {
      const data = queryClient.getQueryData<DataTicket[]>(["tickets"])
      queryClient.setQueryData(["tickets"], data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
    },
    onError: () => {
      notificarError("No se pudo procesar el ticket")
    }
  })
  const onSubmit = (data: CamposGestionTicket) => {
    gestionMutation.mutate({ data, idticket: ticket.idticket })

  }
  // estas funciones no deberian ir aqui pero era para probar, y tambien luego le explico lo del useCallback porque si es algo raro

  return (
    <FormProvider {...metodos}>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-xl text-slate-500">
          {
            primera ?
              "Realiza la debida clasificación del ticket"
              :
              "Edición de la clasificación del ticket"
          }
        </h1>
        {errors.idtipo_servicio && <ErrorFormulario>{errors.idtipo_servicio.message}</ErrorFormulario>}
        {/* <CampoTexto  {...register("c_dane_departamento")} placeholder="Departamento"/> */}
        <QuerySelect label="Tipo de servicio" defaultValue={ticket.idtipo_servicio} optionLabel="tipo_servicio" value="idtipo_servicio" queryKey="select-servicios" queryFn={servicioService.obtenerServicios} {...register("idtipo_servicio")} />
        {errors.prioridad && <ErrorFormulario>{errors.prioridad.message}</ErrorFormulario>}

        <SelectLabel defaultValue={CapitalizeString(ticket.prioridad) || "Media"} label="Prioridad" className="my-2" {...register("prioridad")}>
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
        </SelectLabel>


        <BotonPrimario type="submit">Guardar</BotonPrimario>

      </form>
    </FormProvider>
  )

}
export default FormularioGestionarTicket;