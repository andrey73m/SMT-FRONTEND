import { DataOferta } from "@/models/DataPromociones";
import { FormularioProps } from "./PropsFormulario";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { CamposOferta, ofertaResolver } from "./validators";
import ErrorFormulario from "./Error";
import { CampoFecha, CampoTexto } from "../UI";
import CampoContador from "../UI/CampoContador";
import { BotonPositivo, BotonPrimario } from "../UI/Botones";
import { useCallback, useEffect, useRef, useState } from "react";
import inventarioService from "@/services/inventarioService";
import QuerySelect from "./QuerySelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import promocionService from "@/services/promocionService";
import { notificarExito } from "@/utils";
import OpcionSeleccion from "../pages/OpcionSeleccion";
import DialogoMostrar, { tipoReferencia } from "../UI/DialogoMostrar";
import BotonNeutro from "../UI/Botones/BotonNeutro";
import timeService from "@/services/timeService";
import SelectorProducto from "./SelecctorProducto";
import { isAxiosError } from "axios";

interface FormularioOfertaProps extends FormularioProps{
  oferta?: DataOferta;
  idproducto?: string
}



const FormularioOferta = ({ modoActualizar, oferta, afterSubmit }: FormularioOfertaProps) => {
  const modos = ["Categoría", "Producto"]
  const [modo, setModo] = useState<0 | typeof modos.length>(oferta?.idproducto ? 1 : 0)
  const [generalError, setGeneralError] = useState<string | null>(null);
  const metodos = useForm<CamposOferta>(
    {
      defaultValues: {
        asunto: oferta?.asunto,
        descripcion: oferta?.descripcion,
        porcentaje: oferta?.porcentaje,
        fecha_inicio: timeService.convertirFechaEnIso(oferta?.fecha_inicio),
        fecha_fin: timeService.convertirFechaEnIso(oferta?.fecha_fin),
        idproducto: oferta?.idproducto
      },
      resolver: ofertaResolver
    }
  )
  const { register, handleSubmit, reset, watch, unregister, formState: { errors } } = metodos

  const { data: productoSeleccionado, refetch } = useQuery({
    queryKey: ["producto-seleccionado-form-oferta"],
    queryFn: () => {
      return inventarioService.obtenerProducto(watch("idproducto") || "")
    },
    enabled: false,
  })

  useEffect(() => {
    if (watch("idproducto"))
      refetch()
  }, [watch("idproducto")])

  useEffect(() => {
    if (modo === 1){
      unregister("idcategoria")
    }
    else if (modo === 0) {
      unregister("idproducto")
    }
  },[modo])

  const referenciaDialogoProductos = useRef<tipoReferencia>(null);

  const onSubmit = (data: CamposOferta) => {
    if (!modoActualizar)
      return createMut.mutate(data)

    if (oferta)
      return updateMut.mutate(data)
  }
  const handleError = (e: Error) => {
    if (isAxiosError(e)) {
      if (!e.response || !e.response?.data) return
      const { data: errorData, status } = e.response
      if (status === 409) {
        return setGeneralError(errorData.message)
      }
    }
  }
  const updateMut = useMutation({
    mutationFn: promocionService.actualizarOferta(oferta?.idoferta),
    onSuccess: () => {

      notificarExito("Oferta actualizada")
      if (afterSubmit) afterSubmit()
      reset()
      setGeneralError(null)
    },
    onError: (e) => {
      handleError(e)
    }
  })

  const createMut = useMutation({
    mutationFn: promocionService.crearOferta,
    onSuccess: () => {

      notificarExito("Oferta creada")
      if (afterSubmit) afterSubmit()
      reset()
    },
    onError: (e) => {
      handleError(e)
    }
  })

  
  const queryCategorias = useCallback(() => {
    return inventarioService.obtenerCategorias()
  }
  , [watch().idcategoria])
  return (
    <FormProvider {...metodos}>

      {modo === 1 &&
        <DialogoMostrar ref={referenciaDialogoProductos} className="h-full overflow-y-auto scroll-secundario">
          <Controller
            
            name="idproducto"
            control={metodos.control}
            render={({ field: { onBlur, ...field } }) => {
              console.log("field",field)
              
              return <SelectorProducto
                {...field}
                onBlur = {() => {
                  onBlur()
                  //TODO: CONVERTIR LA REFERENCIA AL DIALOGO EN UN CUSTOM HOOK
                  referenciaDialogoProductos?.current?.setMostrarDialogo(false)
                }}
                
              />
            }}
          />
        </DialogoMostrar>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="text-black grow bg-white flex flex-col items-center justify-normal p-5">
        <h1 className="mb-5 font-bold text-3xl">{modoActualizar ? "Edita una oferta" : "Agrega una nueva oferta"}</h1>
        <header className="w-full flex gap-x-2">
          <label className="text-2xl">Oferta para: </label>
          {
            modos.map((m,i) =>
              <OpcionSeleccion key={i} nombre={m} selected = {i === modo} onClick={() => setModo(i)}/>
            )
          }
        </header>
        
        {errors.asunto && <ErrorFormulario>{errors.asunto.message}</ErrorFormulario>}
        <CampoTexto {...register("asunto")} placeholder="Asunto"/>
        {errors.descripcion && <ErrorFormulario>{errors.descripcion.message}</ErrorFormulario>}
        <textarea {...register("descripcion")} className="min-h-36 max-h-36 w-full mb-24 sm:mb-12 border-2 outline-none focus:border-purple-600 p-2" placeholder="Descripción"/>
        <div className="w-full flex justify-around items-center flex-wrap my-2 *:flex *:flex-col *:w-full md:*:w-1/2 *:px-5">
          <fieldset className="gap-y-8 mb-5 md:mb-0">
            <div>

              {errors.porcentaje && <ErrorFormulario>{errors.porcentaje.message}</ErrorFormulario>}
              <CampoContador initial={oferta?.porcentaje ?? 0} min = {1} max={100} label="Porcentaje" {...register("porcentaje")} className="h-10"/>
            </div>
            <div>
              {modo === 0 ?
                <>

                  {errors.idcategoria && <ErrorFormulario>{errors.idcategoria.message}</ErrorFormulario>}

                  <QuerySelect showError={false} defaultValue={oferta?.idcategoria.toString()} label="Categoría" optionLabel="denominacion" value="idcategoria" queryKey="select-categoria" queryFn={queryCategorias} {...register("idcategoria")} />
                </>
                :
                <>
                  {
                    watch("idproducto") && productoSeleccionado ? <p className="text-ellipsis line-clamp-1 rounded-sm">Prducto seleccionado: {productoSeleccionado.nombre}</p> : (errors.idproducto && <ErrorFormulario>{errors.idproducto.message}</ErrorFormulario> ) || <ErrorFormulario>No se ha seleccionado un producto</ErrorFormulario>
                  }
                  <BotonNeutro simplificar type="button" onClick={() => referenciaDialogoProductos?.current?.setMostrarDialogo(true)}>Seleccionar producto</BotonNeutro>
                </>
              }
            </div>
          </fieldset>
          <fieldset className="flex flex-col">
            <div>

              <label>Fecha de inicio</label>
              {errors.fecha_inicio && <ErrorFormulario>{errors.fecha_inicio.message}</ErrorFormulario>}
              <CampoFecha {...register("fecha_inicio")} />
            </div>
            <div>

              <label>Fecha de finalización</label>
              {errors.fecha_fin && <ErrorFormulario>{errors.fecha_fin.message}</ErrorFormulario>}
              <CampoFecha {...register("fecha_fin")}/>
            </div>
          </fieldset>
        </div>
        {generalError && <ErrorFormulario>{generalError}</ErrorFormulario>}
        {modoActualizar ?
          <BotonPositivo className="m-2">Aplicar</BotonPositivo> :
        
          <BotonPrimario type="submit">Crear</BotonPrimario>}
      </form>
    </FormProvider>
  )
}

export default FormularioOferta