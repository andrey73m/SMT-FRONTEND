import { useForm, FormProvider } from "react-hook-form";
import { Boton, CampoTexto, EditorTexto } from "../UI";
import CampoFormateado from "./CampoFormateado";
import { CamposTicket } from "./validators";
import ticketService from "../../services/ticketService";
import useSesion from "../../hooks/sesion";

const FormularioTicket = () => {

  const { info, haySesion } = useSesion()
  const metodos = useForm<CamposTicket>()
  const onSubmit = async (data: CamposTicket) => {
    if (info.email && info.email.length > 0){
      // console.log("")
      data.email = info.email;
    }
    
    const res = await ticketService.createTicket(data);

    console.log("Creado")
  }

  return (
    <>
      <FormProvider {...metodos}>
        <form onSubmit={metodos.handleSubmit(onSubmit)} className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
          <h1 className="mb-5 font-bold text-3xl">Cuéntanos ¿Que problema tienes?</h1>
          {!haySesion && <CampoTexto placeholder="Correo Electronico" {...metodos.register("email")} />}
          <CampoTexto placeholder="Asunto" {...metodos.register("asunto")}/>
          <CampoFormateado name="contenido"/>
          <Boton type="submit" >Enviar</Boton>
        </form>
      </FormProvider>
    </>
  )
}

export default FormularioTicket;