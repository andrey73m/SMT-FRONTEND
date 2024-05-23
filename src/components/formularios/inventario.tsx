import { FormProvider, useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { inventarioResolver, CamposInventario } from "./validators";
import ErrorFormulario from "./Error"
import { BotonPositivo, BotonPrimario } from "../UI/Botones";
import { useCallback } from "react";
import axios from "axios";
import QuerySelect from "./QuerySelect";
import { env } from "../../environment";
import { DataProducto } from "@/models/DataProducto";
import { useMutacionActualizarProducto, useMutacionCrearComponente } from "@/hooks/producto";

interface FormularioInventarioProps{
  modoActualizar?: boolean;
  producto?: DataProducto;
  afterSubmit?: ()=>void
}

const FormularioInventario = ({ modoActualizar, producto, afterSubmit }: FormularioInventarioProps) => {
  const metodos = useForm<CamposInventario>(
    {
      defaultValues: {
        idcomponente: producto?.idcomponente,
        sku: producto?.sku,
        disponibilidad: producto?.disponibilidad.toString() || "",
        precio: producto?.precio.toString() || "",
      },
      resolver: inventarioResolver
    }
  )
  const { register, handleSubmit, reset ,formState: { errors } } = metodos

  const mutacionCrearComponente = useMutacionCrearComponente(() => {
    if (afterSubmit) afterSubmit()
    reset()
  })

  const mutacionActualizarProducto = useMutacionActualizarProducto(() => {
    if (afterSubmit) afterSubmit() })

  const onSubmit = async(data: CamposInventario) => {
    if(!modoActualizar)
      return mutacionCrearComponente.mutate(data);
    if(producto){
      mutacionActualizarProducto.mutate({ idproducto: producto.idproducto, data })
    }
  }

  const query = useCallback(async () => (await axios.get(`${env.BACKEND_ROOT}/componentes/catalogo`)).data, [])

  return (
    <FormProvider {...metodos}>
      
      <form onSubmit={handleSubmit(onSubmit)} className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">{modoActualizar ? "Edita el producto" : "Crea un nuevo producto" }</h1>
        {errors.idcomponente && <ErrorFormulario>{errors.idcomponente.message}</ErrorFormulario>}
        <QuerySelect defaultValue={producto?.idcomponente} label="Componente" optionLabel="nombre" value="idcomponente" queryKey="select-componente" queryFn={query} {...register("idcomponente")}/>
        {errors.sku && <ErrorFormulario>{errors.sku.message}</ErrorFormulario>}
        <CampoTexto  {...register("sku")} placeholder="SKU"/>
        {errors.disponibilidad && <ErrorFormulario>{errors.disponibilidad.message}</ErrorFormulario>}
        <CampoTexto  {...register("disponibilidad")} placeholder="Disponibilidad"/>
        {errors.precio && <ErrorFormulario>{errors.precio.message}</ErrorFormulario>}
        <CampoTexto  {...register("precio")} placeholder="Precio"/>
        {modoActualizar ?
          <BotonPositivo className="m-2">Actualizar producto</BotonPositivo> :
          <BotonPrimario type="submit" >Guardar producto</BotonPrimario>}
      </form>
    </FormProvider>
  )
}
export default FormularioInventario;