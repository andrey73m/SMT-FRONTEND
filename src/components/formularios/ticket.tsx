import { useForm, FormProvider } from "react-hook-form";
import CampoTexto from "../UI/CampoTexto";
import CampoFormateado from "./CampoFormateado";
import { CamposTicket } from "./validators";
import ticketService from "@/services/ticketService";
import useSesion from "@/hooks/sesion";
import { BotonPrimario } from "../UI/Botones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificarError, notificarExito } from "@/utils";
import { useAppDispatch } from "@/store";

const FormularioTicket = () => {

  const { info, haySesion } = useSesion()
  const queryClient = useQueryClient();
  const metodos = useForm<CamposTicket>({
    defaultValues:{
      asunto: "",
      contenido: ""
    }
  })
  const dispatch = useAppDispatch()
  const mutacionSubmit = useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: (e) => {
      console.log(e)
      if (haySesion)
        notificarExito("Ticket creado, pronto te atenderemos a")
      else{
        notificarExito("Ticket creado, revisa tu correo para mas detalles")
        metodos.setValue("email","")
      }
      metodos.reset()
      queryClient.invalidateQueries({ queryKey:["tickets"] })
    },
    onError: (e) => {
      console.log(e)
      notificarError(e.response.data.error)
    }
  })

  const onSubmit = async (data: CamposTicket) => {
    console.log(data)
    mutacionSubmit.mutate(data)
  }

  return (
    <>
      <FormProvider {...metodos}>
        <form onSubmit={metodos.handleSubmit(onSubmit)} id="formulario-ticket" className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
          <h1 className="mb-5 font-bold text-3xl">Cuéntanos ¿Qué problema tienes?</h1>
          {!haySesion && <CampoTexto placeholder="Tu correo de contacto" {...metodos.register("email")} />}
          <CampoTexto placeholder="Asunto" {...metodos.register("asunto")}/>
          <div className="h-36 w-full mb-24 sm:mb-12">
            <CampoFormateado name="contenido"/>
          </div>
          <BotonPrimario type="submit" >Enviar</BotonPrimario>
        </form>
      </FormProvider>
    </>
  )
}

export default FormularioTicket;