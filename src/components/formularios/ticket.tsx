import { useForm, FormProvider } from "react-hook-form";
import { Boton, EditorTexto } from "../UI";
import CampoFormateado from "./CampoFormateado";

interface prueba{
  contenido: string
}

const FormularioTicket = () => {

  const metodos = useForm<prueba>()
  const onSubmit = (data: prueba) => {
    console.log(data)
  }
  //TODO:IMPORTANTE > HACER ELEMENTO DE FORM para AUTH
  return (
    <FormProvider {...metodos}>
      

      <form onSubmit={metodos.handleSubmit(onSubmit)} className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">Cuentanos ¿Que problema tienes?</h1>

        <CampoFormateado name="contenido"/>
        <div>
          <Boton type="submit" >Enviar</Boton>
        </div>
      </form>
    </FormProvider>
  )
}

export default FormularioTicket;