import { useForm, FormProvider } from "react-hook-form";
import CampoTexto from "../UI/CampoTexto";
import CampoFormateado from "./CampoFormateado";
import { CamposTicket } from "./validators";
import ticketService from "@/services/ticketService";
import { useSesion } from "@/hooks";
import { BotonPrimario } from "../UI/Botones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificarError, notificarExito } from "@/utils";
import { FormularioProps } from "./PropsFormulario";
import { useEffect } from "react";



const FormularioTicket = ({ afterSubmit }: FormularioProps) => {

  const { haySesion } = useSesion()
  const queryClient = useQueryClient();
  const metodos = useForm<CamposTicket>({
    defaultValues:{
      asunto: "",
      contenido: ""
    }
  })
  useEffect(() => {
    if (haySesion){
      metodos.unregister("email")
    }
  },[haySesion])
  const mutacionSubmitWithEmail = useMutation({
    mutationFn: ticketService.createTicketWithEmail,
    onSuccess: (a) => {
      console.log(a)

      notificarExito("Ticket creado, revisa tu correo para mas detalles")
      // if (haySesion) metodos.setValue("email","")
      if (afterSubmit) afterSubmit()
      metodos.reset()
      queryClient.invalidateQueries({ queryKey: ["tickets"] })

    },
    onError: (e) => {
      const error = e as any
      console.log("error")
      notificarError(error.response.data.error)
    }
  })
  const mutacionSubmit = useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: (a) => {
      console.log(a)
  
      notificarExito("Ticket creado, pronto te atenderemos")

      if (afterSubmit) afterSubmit()
      metodos.reset()
      queryClient.invalidateQueries({ queryKey:["tickets"] })

    },
    onError: (e) => {
      const error = e as any
      console.log("error")
      notificarError(error.response.data.error)
    }
  })

  const onSubmit = async (data: CamposTicket) => {
    if (haySesion){
      mutacionSubmit.mutate(data)
      return
    }
    mutacionSubmitWithEmail.mutate(data)
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