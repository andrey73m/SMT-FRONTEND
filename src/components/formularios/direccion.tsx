import { useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { direccionResolver, CamposDireccion } from "./validators";
import ErrorFormulario from "./Error"
import QuerySelect from "./QuerySelect";
import axios from "axios";
import { env } from "../../environment";
import { useCallback } from "react";
import { BotonPrimario } from "../UI/Botones";

const FormularioDireccion = () => {
  const { register, handleSubmit, getValues,watch, formState: { errors } } = useForm<CamposDireccion>(
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

  
  const onSubmit = (data: CamposDireccion) => {
    
    console.log(data)

  }
  // estas funciones no deberian ir aqui pero era para probar, y tambien luego le explico lo del useCallback porque si es algo raro
  const query = useCallback(async () => (await axios.get(`${env.BACKEND_ROOT}/domicilio/listadepartamentos`)).data, [])
  const query2 = useCallback(async () => (await axios.get(`${env.BACKEND_ROOT}/domicilio/listamunicipios/${getValues().c_dane_departamento}`)).data
    , [watch().c_dane_departamento])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Ingresar dirección</h1>
      {errors.c_dane_departamento && <ErrorFormulario>{errors.c_dane_departamento.message}</ErrorFormulario>}
      {/* <CampoTexto  {...register("c_dane_departamento")} placeholder="Departamento"/> */}
      <QuerySelect label="Departamento" optionLabel="departamento" value="c_digo_dane_del_departamento" queryKey="select-departamentos" queryFn={query} {...register("c_dane_departamento")}/>
      {errors.c_dane_municipio && <ErrorFormulario>{errors.c_dane_municipio.message}</ErrorFormulario>}
      <QuerySelect label="Municipio" optionLabel="municipio" value="c_digo_dane_del_municipio" queryKey="select-municipios" queryFn={query2} {...register("c_dane_municipio")} />
      {errors.barrio && <ErrorFormulario>{errors.barrio.message}</ErrorFormulario>}
      <CampoTexto  {...register("barrio")} placeholder="Barrio"/>
      {errors.cadena_direccion && <ErrorFormulario>{errors.cadena_direccion.message}</ErrorFormulario>}
      <CampoTexto  {...register("cadena_direccion")} placeholder="Direccion"/>

      <BotonPrimario type="submit" >Guardar dirección</BotonPrimario>
      
    </form>
  )

}
export default FormularioDireccion;