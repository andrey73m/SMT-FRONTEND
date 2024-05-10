import { servicioResolver } from "./validators";
import { CamposServicio } from "./validators";
import ErrorFormulario from "./Error";
import { CampoTexto } from "../UI";
import { BotonPrimario } from "../UI/Botones";
import { useForm } from "react-hook-form";
import servicioService from "@/services/servicioService";

const FormularioServicio = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CamposServicio>(
    {
      defaultValues: {
        tipo_servicio: "",
        descripcion: "",
      },
      resolver: servicioResolver
    }
  )
  const onSubmit = async (data: CamposServicio) => {
    
    console.log(data)
    const res = await servicioService.crearServicio(data)
    console.log(res)
    

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Agregar servicio</h1>
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      {errors.tipo_servicio && <ErrorFormulario>{errors.tipo_servicio.message}</ErrorFormulario>}
      <CampoTexto  {...register("tipo_servicio")} placeholder="Nombre servicio"/>
      {errors.descripcion && <ErrorFormulario>{errors.descripcion.message}</ErrorFormulario>}
      <CampoTexto {...register("descripcion")} placeholder="Descripción" />
      <BotonPrimario type="submit" >Agregar servicio</BotonPrimario>
    </form>
      
  )
}

export default FormularioServicio;