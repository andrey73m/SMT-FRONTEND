import { FormProvider, useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { productoResolver, CamposProducto } from "./validators";
import ErrorFormulario from "./Error"
import { BotonPositivo, BotonPrimario } from "../UI/Botones";
import { useCallback } from "react";
import axios from "axios";
import QuerySelect from "./QuerySelect";
import { env } from "../../environment";
import { DataProducto } from "@/models/DataProducto";
import { useMutacionActualizarProducto, useMutacionCrearProducto } from "@/hooks/producto";

interface FormularioInventarioProps{
  modoActualizar?: boolean;
  producto?: DataProducto;
  afterSubmit?: ()=>void
}

const FormularioInventario = ({ modoActualizar, producto, afterSubmit }: FormularioInventarioProps) => {
  const metodos = useForm<CamposProducto>(
    {
      defaultValues: {
        idproducto: producto?.idproducto,
        categoria: producto?.idcategoria.toString() || "",
        disponibilidad: producto?.disponibilidad.toString() || "",
        precio: producto?.precio.toString() || "",
      },
      resolver: productoResolver
    }
  )
  const { register, handleSubmit, reset ,formState: { errors } } = metodos

  const mutacionCrearProducto = useMutacionCrearProducto(() => {
    if (afterSubmit) afterSubmit()
    reset()
  })

  const mutacionActualizarProducto = useMutacionActualizarProducto(() => {
    if (afterSubmit) afterSubmit() })

  const onSubmit = async(data: CamposProducto) => {
    if(!modoActualizar)
      return mutacionCrearProducto.mutate(data);
    if(producto){
      mutacionActualizarProducto.mutate({ idproducto: producto.idproducto, data })
    }
  }

  const query = useCallback(async () => (await axios.get(`${env.BACKEND_ROOT}/productos/catalogo`)).data, [])

  return (
    <FormProvider {...metodos}>
      
      <form onSubmit={handleSubmit(onSubmit)} className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">{modoActualizar ? "Edita el producto" : "Crea un nuevo producto" }</h1>
        {errors.idproducto && <ErrorFormulario>{errors.idproducto.message}</ErrorFormulario>}
        <QuerySelect defaultValue={producto?.idproducto} label="Producto" optionLabel="nombre" value="idproducto" queryKey="select-producto" queryFn={query} {...register("idproducto")}/>
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