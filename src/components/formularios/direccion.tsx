import { FormProvider, useForm } from "react-hook-form"
import {  CampoTexto } from "../UI"
import { direccionResolver, CamposDireccion } from "./validators";
import ErrorFormulario from "./Error"
import QuerySelect from "./QuerySelect";
import { BotonPositivo, BotonPrimario, BotonSecundario } from "../UI/Botones";
import direccionesService from "@/services/direccionesService";
import { useCallback, useRef } from "react";
import DataDireccion from "@/models/DataDireccion";
import { useMutacionCrearDireccion, useMutacionActualizarDireccion, useMutacionActualizarPredeterminada } from "@/hooks/direcciones";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "../UI/DialogoConfirmar";
import { FormularioProps } from "./PropsFormulario";

interface FormularioDireccionProps extends FormularioProps{
  direccion?: DataDireccion;
}

const FormularioDireccion = ({ modoActualizar, direccion, afterSubmit }: FormularioDireccionProps) => {

  const metodos = useForm<CamposDireccion>(
    {
      defaultValues: {
        c_dane_departamento: direccion?.c_dane_departamento,
        c_dane_municipio: direccion?.c_dane_municipio,
        barrio: direccion?.barrio,
        cadena_direccion: direccion?.cadena_direccion,
        predeterminada: false,
      },
      resolver: direccionResolver
    }
  )
  const { register, handleSubmit, getValues, watch, reset, formState: { errors } } = metodos
  
  const mutacionCrearDireccion = useMutacionCrearDireccion(() => {
    if (afterSubmit) afterSubmit()
    reset()
  })

  const mutacionActualizarDireccion = useMutacionActualizarDireccion(() => {
    if (afterSubmit) afterSubmit()
  })

  const mutacionActualizarPredeterminada = useMutacionActualizarPredeterminada (() => {
  })

  const handlePredeterminada = async() => {
    if(direccion){
      mutacionActualizarPredeterminada.mutate(direccion.iddireccion)
      if (afterSubmit) afterSubmit()
    }
  }

  const onSubmit = async (data: CamposDireccion) => {
    if(!modoActualizar)
      return mutacionCrearDireccion.mutate(data);
    if(direccion){
      mutacionActualizarDireccion.mutate({ iddireccion: direccion.iddireccion, data })
    }
  }

  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)


  const queryMunicipios = useCallback(() => {
    const codigo_departamento = getValues().c_dane_departamento;
    if (codigo_departamento)
      return direccionesService.obtenerMunicipios(codigo_departamento)
    return []
  }
  ,[watch().c_dane_departamento])

  return (
    <>
      <DialogoConfirmar ejecutarAccion={handlePredeterminada} titulo="¿Quiéres cambiar la dirección predeterminada?" ref= {referenciaConfirmacion}/>
      <div className="flex justify-center flex-col">
        <FormProvider {...metodos} >
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-normal p-5 ">
            <h1 className="mb-5 font-bold text-3xl"> {modoActualizar ? "Actualizar dirección" : "Crea una nueva dirección" }</h1>
            {errors.c_dane_departamento && <ErrorFormulario>{errors.c_dane_departamento.message}</ErrorFormulario>}
            <QuerySelect label="Departamento" optionLabel="departamento" value="c_digo_dane_del_departamento" defaultValue={direccion?.c_dane_departamento} queryKey="select-departamentos" queryFn={direccionesService.obtenerDepartamentos} {...register("c_dane_departamento")}/>
            {errors.c_dane_municipio && <ErrorFormulario>{errors.c_dane_municipio.message}</ErrorFormulario>}
            <QuerySelect label="Municipio" optionLabel="municipio" value="c_digo_dane_del_municipio" defaultValue={direccion?.c_dane_municipio} queryKey="select-municipios" queryFn={queryMunicipios} {...register("c_dane_municipio")} />
            {errors.barrio && <ErrorFormulario>{errors.barrio.message}</ErrorFormulario>}
            <CampoTexto  {...register("barrio")} placeholder="Barrio"/>
            {errors.cadena_direccion && <ErrorFormulario>{errors.cadena_direccion.message}</ErrorFormulario>}
            <CampoTexto  {...register("cadena_direccion")} placeholder="Direccion"/>
            {!modoActualizar &&
            <><input className="border-2" type="checkbox" {...register("predeterminada")}/> Dirección predeterminada </>
            }
          
            {modoActualizar ?
              <BotonPositivo className="m-2">Actualizar</BotonPositivo> :
              <BotonPrimario type="submit" >Guardar dirección</BotonPrimario>}
            {modoActualizar && <BotonSecundario type="button"  onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)} >Asignar dirección como predeterminada</BotonSecundario>
            }
          </form>
        </FormProvider>
      </div>
    </>
  )

}
export default FormularioDireccion;