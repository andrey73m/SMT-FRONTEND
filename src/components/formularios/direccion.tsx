import { useForm } from "react-hook-form"
import { Boton, CampoTexto } from "../UI"
import { direccionResolver, CamposDireccion } from "./validators";
import ErrorFormulario from "./Error"

const FormularioDireccion = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CamposDireccion>(
    {
      defaultValues: {
        c_dane_departamento: "",
        c_dane_municipio: "",
        barrio: "",
        cadena_direccion: "",
      },
      resolver: direccionResolver
    }
  )
  
  const onSubmit = (data) => {
    
    console.log(data)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Ingresar dirección</h1>
      {errors.c_dane_departamento && <ErrorFormulario>{errors.c_dane_departamento.message}</ErrorFormulario>}
      <CampoTexto  {...register("c_dane_departamento")} placeholder="Departamento"/>
      {errors.c_dane_municipio && <ErrorFormulario>{errors.c_dane_municipio.message}</ErrorFormulario>}
      <CampoTexto  {...register("c_dane_municipio")} placeholder="Municipio"/>
      {errors.barrio && <ErrorFormulario>{errors.barrio.message}</ErrorFormulario>}
      <CampoTexto  {...register("barrio")} placeholder="Barrio"/>
      {errors.cadena_direccion && <ErrorFormulario>{errors.cadena_direccion.message}</ErrorFormulario>}
      <CampoTexto  {...register("cadena_direccion")} placeholder="Direccion"/>

      <Boton type="submit" >Guardar dirección</Boton>
      
    </form>
  )

} 
export default FormularioDireccion;