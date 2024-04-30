import { useForm } from "react-hook-form"
import { Boton, CampoTexto } from "../UI"
import { componenteResolver, CamposComponente } from "./validators";
import ErrorFormulario from "./Error"

const FormularioComponente = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CamposComponente>(
    {
      defaultValues: {
        categoria: "",
        marca: "",
        nombre: "",
        descripcion: "",
      },
      resolver: componenteResolver
    }
  )
  
  const onSubmit = (data: CamposComponente) => {
    
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrar componente</h1>
      {errors.categoria && <ErrorFormulario>{errors.categoria.message}</ErrorFormulario>}
      <CampoTexto  {...register("categoria")} placeholder="Categoria"/>
      {errors.marca && <ErrorFormulario>{errors.marca.message}</ErrorFormulario>}
      <CampoTexto  {...register("marca")} placeholder="Marca"/>
      {errors.nombre && <ErrorFormulario>{errors.nombre.message}</ErrorFormulario>}
      <CampoTexto  {...register("nombre")} placeholder="Nombre"/>
      {errors.descripcion && <ErrorFormulario>{errors.descripcion.message}</ErrorFormulario>}
      <CampoTexto  {...register("descripcion")} placeholder="Descripcion"/>

      <Boton type="submit" >Guardar componente</Boton>
      
    </form>
  )

}
export default FormularioComponente;