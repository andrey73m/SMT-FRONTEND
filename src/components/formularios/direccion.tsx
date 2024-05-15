import { FormProvider, useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { direccionResolver, CamposDireccion } from "./validators";
import ErrorFormulario from "./Error"
import QuerySelect from "./QuerySelect";
import { AxiosError } from "axios";
import { BotonPrimario } from "../UI/Botones";
import direccionesService from "@/services/direccionesService";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bounce, ToastContainer, toast } from "react-toastify";

const FormularioDireccion = () => {
  const metodos = useForm<CamposDireccion>(
    {
      defaultValues: {
        c_dane_departamento: "",
        c_dane_municipio: "",
        barrio: "",
        cadena_direccion: "",
        predeterminada: false,
      },
      resolver: direccionResolver
    }
  )
  const { register, handleSubmit, getValues, watch, reset, formState: { errors } } = metodos
  
  const mutacionCrearDireccion = useMutation({
    mutationFn:direccionesService.crearDireccion,
    onSuccess: () => {
      toast("Direccion creada", {
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
        className: "bg-green-300 w-96 select-none text-green-800 p-2 rounded-sm my-2",

      })
      reset()
    },
    onError: (error) => {
      const e = error as AxiosError<{error: string}>
      toast(e.response?.data.error, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "bg-red-300 w-96 select-none text-red-600 p-2 rounded-sm my-2",

      })
    } ,
  });
  
  const onSubmit = async (data: CamposDireccion) => {
    console.log(data)
    // mutacionCrearDireccion.mutate(data)

  }

  const queryMunicipios = useCallback(() => {
    const codigo_departamento = getValues().c_dane_departamento;
    if (codigo_departamento)
      return direccionesService.obtenerMunicipios(codigo_departamento)
    return []
  }
  ,[watch().c_dane_departamento])

  return (
    <FormProvider {...metodos} >
        

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">Ingresar dirección</h1>
        {errors.c_dane_departamento && <ErrorFormulario>{errors.c_dane_departamento.message}</ErrorFormulario>}
        {/* <CampoTexto  {...register("c_dane_departamento")} placeholder="Departamento"/> */}
        <input className="border-2" type="checkbox" {...register("predeterminada")}/>
        <QuerySelect label="Departamento" optionLabel="departamento" value="c_digo_dane_del_departamento" queryKey="select-departamentos" queryFn={direccionesService.obtenerDepartamentos} {...register("c_dane_departamento")}/>
        {errors.c_dane_municipio && <ErrorFormulario>{errors.c_dane_municipio.message}</ErrorFormulario>}
        <QuerySelect label="Municipio" optionLabel="municipio" value="c_digo_dane_del_municipio" queryKey="select-municipios" queryFn={queryMunicipios} {...register("c_dane_municipio")} />
        {errors.barrio && <ErrorFormulario>{errors.barrio.message}</ErrorFormulario>}
        <CampoTexto  {...register("barrio")} placeholder="Barrio"/>
        {errors.cadena_direccion && <ErrorFormulario>{errors.cadena_direccion.message}</ErrorFormulario>}
        <CampoTexto  {...register("cadena_direccion")} placeholder="Direccion"/>

        <BotonPrimario type="submit" >Guardar dirección</BotonPrimario>
      
      </form>
    </FormProvider>
  )

}
export default FormularioDireccion;