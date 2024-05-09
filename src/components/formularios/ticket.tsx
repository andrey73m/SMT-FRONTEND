import { useForm, FormProvider } from "react-hook-form";
import CampoTexto from "../UI/CampoTexto";
import CampoFormateado from "./CampoFormateado";
import { CamposTicket } from "./validators";
import ticketService from "@/services/ticketService";
import useSesion from "@/hooks/sesion";
import { BotonPrimario } from "../UI/Botones";

const FormularioTicket = () => {

  const { info, haySesion } = useSesion()
  const metodos = useForm<CamposTicket>()
  const onSubmit = async (data: CamposTicket) => {
    if (info.email && info.email.length > 0){
      // console.log("")
      data.email = info.email;
      const res = await ticketService.createTicket(data);
      console.log("Creado")
      return
    }
    
    const res = await ticketService.createTicketEmail(data);
    console.log("Creado")
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