import { useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { inventarioResolver, CamposInventario } from "./validators";
import ErrorFormulario from "./Error"
import { BotonPrimario } from "../UI/Botones";
import inventarioService from "../../services/inventarioService";
import { useCallback } from "react";
import axios from "axios";
import QuerySelect from "./QuerySelect";
import { env } from "../../environment";

const FormularioInventario = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CamposInventario>(
    {
      defaultValues: {
        idcomponente:"",
        sku: "",
        disponibilidad: "",
        precio: "",
      },
      resolver: inventarioResolver
    }
  )
  
  const onSubmit = async(data: CamposInventario) => {
    
    console.log(data)
    const res = await inventarioService.crearProducto(data)
    console.log(res)
  }

  const query = useCallback(async () => (await axios.get(`${env.BACKEND_ROOT}/componentes/catalogo`)).data, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrar inventario</h1>
      {errors.idcomponente && <ErrorFormulario>{errors.idcomponente.message}</ErrorFormulario>}
      <QuerySelect label="Componente" optionLabel="nombre" value="idcomponente" queryKey="select-componente" queryFn={query} {...register("idcomponente")}/>
      {errors.sku && <ErrorFormulario>{errors.sku.message}</ErrorFormulario>}
      <CampoTexto  {...register("sku")} placeholder="SKU"/>
      {errors.disponibilidad && <ErrorFormulario>{errors.disponibilidad.message}</ErrorFormulario>}
      <CampoTexto  {...register("disponibilidad")} placeholder="Disponibilidad"/>
      {errors.precio && <ErrorFormulario>{errors.precio.message}</ErrorFormulario>}
      <CampoTexto  {...register("precio")} placeholder="Precio"/>
      <BotonPrimario type="submit" >Agregar inventario</BotonPrimario>
    </form>
  )
}
export default FormularioInventario;