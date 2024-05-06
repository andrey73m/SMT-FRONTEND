import { useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { inventarioResolver, CamposInventario } from "./validators";
import ErrorFormulario from "./Error"
import { BotonPrimario } from "../UI/Botones";

const FormularioInventario = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CamposInventario>(
    {
      defaultValues: {
        SKU: "",
        disponibilidad: 0,
        precio: 0,
      },
      resolver: inventarioResolver
    }
  )
  
  const onSubmit = (data) => {
    
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrar inventario</h1>
      {errors.SKU && <ErrorFormulario>{errors.SKU.message}</ErrorFormulario>}
      <CampoTexto  {...register("SKU")} placeholder="SKU"/>
      {errors.disponibilidad && <ErrorFormulario>{errors.disponibilidad.message}</ErrorFormulario>}
      <CampoTexto  {...register("disponibilidad")} placeholder="Disponibilidad"/>
      {errors.precio && <ErrorFormulario>{errors.precio.message}</ErrorFormulario>}
      <CampoTexto  {...register("precio")} placeholder="Precio"/>
      <BotonPrimario type="submit" >Actualizar inventario</BotonPrimario>
      
    </form>
  )
}
export default FormularioInventario;