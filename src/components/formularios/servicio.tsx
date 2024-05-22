import { servicioResolver } from "./validators";
import { CamposServicio } from "./validators";
import ErrorFormulario from "./Error";
import { CampoTexto } from "../UI";
import { BotonPrimario, BotonSecundario } from "../UI/Botones";
import { useForm } from "react-hook-form";
import { FormularioProps } from "./PropsFormulario";
import { DataServicio } from "@/models";
import Servicio from "../views/servicios/Servicio";
import { useState } from "react";
import { useMutacionActualizarServicio, useMutacionAgregarServicio } from "@/hooks";

interface FormularioServicioProps extends FormularioProps{
  servicio?: DataServicio
}

const FormularioServicio = ({ afterSubmit,modoActualizar,servicio }: FormularioServicioProps) => {
  const [verServicio, setVerServicio] = useState(!!servicio)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CamposServicio>(
    {
      defaultValues: {
        url_imagen: servicio?.url_imagen || "",
        tipo_servicio: servicio?.tipo_servicio || "",
        descripcion: servicio?.descripcion || "",
      },
      resolver: servicioResolver
    }
  )
  const mutacionAgregar = useMutacionAgregarServicio(() => {
    if (afterSubmit) afterSubmit()
  })
  const mutacionActualizar = useMutacionActualizarServicio(() => {
    if (afterSubmit) afterSubmit()
  })

  const onSubmit = async (data: CamposServicio) => {
    if (modoActualizar && servicio){
      
      return  mutacionActualizar.mutate({ idservicio: servicio.idtipo_servicio, data })
    }

    mutacionAgregar.mutate(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-normal p-5 gap-y-2">
        <h1 className="pb-5 font-bold text-3xl"> {modoActualizar && servicio ? `Actualizar: ${servicio.tipo_servicio}` : "Agrega un servicio"}</h1>
        {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
        {errors.tipo_servicio && <ErrorFormulario>{errors.tipo_servicio.message}</ErrorFormulario>}
        <CampoTexto  {...register("tipo_servicio")} placeholder="Nombre servicio"/>
        {errors.url_imagen && <ErrorFormulario>{errors.url_imagen.message}</ErrorFormulario>}
        <CampoTexto  {...register("url_imagen")} placeholder="URL de imagen para el servicio" />
        {errors.descripcion && <ErrorFormulario>{errors.descripcion.message}</ErrorFormulario>}
        <textarea {...register("descripcion")} placeholder="Descripción" className="grow min-h-32 p-2 w-full focus:outline-none focus:border-violet-700 border-2 rounded-lg" />
        {
          modoActualizar ?
            <BotonSecundario>Actualizar servicio</BotonSecundario>
            : <BotonPrimario >Agregar servicio</BotonPrimario>
        }
        <div className="flex gap-x-4">

          <span className="flex gap-x-1 text-lg"><input className="border-2 accent-violet-700" type="checkbox" checked={verServicio} onChange={() => setVerServicio(!verServicio)} /> Mostrar previsualización</span>
        </div>
      </form>
      <div className="px-4">
        {verServicio &&
        <>
          <h4 className="text-xl font-bold text-center">Previsualización</h4>
          <Servicio
            servicio={{
              idtipo_servicio: 0,
              descripcion: watch().descripcion,
              tipo_servicio: watch().tipo_servicio,
              url_imagen: watch().url_imagen
            }}
            botones={false}
          />
        </>
        }
      </div>
    </>
      
  )
}

export default FormularioServicio;