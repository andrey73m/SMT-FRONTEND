import { useForm, FormProvider } from "react-hook-form";
import CampoFormateado from "./CampoFormateado";
import { useQueryDirecciones, useSesion } from "@/hooks";
import { BotonPositivo, BotonPrimario } from "../UI/Botones";
import { FormularioProps } from "./PropsFormulario";
import QuerySelect from "./QuerySelect";
import RAEEService from "@/services/RAEEService";
import { CamposRAEE } from "./validators/raee";
import CampoContador from "../UI/CampoContador";
import DialogoDirecciones from "../pages/DialogoDirecciones";
import { useEffect, useRef, useState } from "react";
import DialogoMostrar, { tipoReferencia } from "../UI/DialogoMostrar";
import FormularioDireccion from "./direccion";
import { useSearchParams } from "react-router-dom";
import { notificarExito } from "@/utils";
import { raeeResolver } from "./validators";
import ErrorFormulario from "./Error";
import DialogoPoliticaAmbiental from "../views/ambiental/politica-ambiental";
import Direccion from "../views/direcciones/Direccion";
import DataDireccion from "@/models/DataDireccion";



const FormularioRAEE = ({ afterSubmit }: FormularioProps) => {

  const { info: {idusuario} } = useSesion()
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: direcciones, isSuccess: successDirecciones } = useQueryDirecciones(idusuario);
  const refDialogoDirecciones = useRef<tipoReferencia>(null)
  const [direccion, setDireccion] = useState<DataDireccion | null>(null);
  const metodos = useForm<CamposRAEE>({
    defaultValues: {
      tipo_dispositivo: "Otros",
      estado_equipo: "",
      peso_aproximado: 1,
      tipo_disposicion: "",
      punto_entrega: "Punto principal (Unilago)",
      direccion: undefined,
      comentarios: ""
    },
    resolver: raeeResolver
  })

  useEffect(()=>{
    if (metodos.getValues("punto_entrega") != "Recolección a domicilio"){
      setSearchParams({})
      setDireccion(null)
    }
  }, [metodos.watch("punto_entrega")])
  useEffect(()=>{
    if (searchParams.has("iddireccion")){
      const iddireccion = searchParams.get("iddireccion") || ""
      metodos.setValue("direccion", iddireccion)
      setDireccion(direcciones?.find(d => d.iddireccion === iddireccion) || null)
    }
  }, [searchParams])
  const onSubmit = async (data: CamposRAEE) => {
    RAEEService.crearRegistro(idusuario,data)
    notificarExito("Ticket creado, pronto te atenderemos")
    
    if (afterSubmit) afterSubmit()
    metodos.reset()
  }
  const { formState: { errors } } = metodos;
  
  return (
    <>
    <DialogoMostrar ref={refDialogoDirecciones}>
      {
        !direcciones?.length && successDirecciones ?
          <>
            <div className="w-full flex flex-col items-center justify-normal  font-bold text-3xl">
              Parece que aún no has agregado un domicilio
            </div>
            <FormularioDireccion  afterSubmit={() => {
              refDialogoDirecciones.current?.setMostrarDialogo(false)
            }} />
          </>
          :
          <DialogoDirecciones afterSelect={() => {
            refDialogoDirecciones.current?.setMostrarDialogo(false)
          }}/>
      }
    </DialogoMostrar>
      <FormProvider {...metodos}>
        <form
          onSubmit={metodos.handleSubmit(onSubmit)}
          id="formulario-raee"
          className="text-black grow bg-white flex flex-col items-center justify-normal p-5"
        >
          <h1 className="mb-5 font-bold text-3xl">
            Programa la disposición de tus residuos eléctricos o electrónicos
          </h1>
          <DialogoPoliticaAmbiental/>
          {/* Tipo de dispositivo */}
          {errors.tipo_dispositivo && (
            <ErrorFormulario>{errors.tipo_dispositivo.message}</ErrorFormulario>
          )}
          <QuerySelect
            label="Tipo de dispositivo"
            optionLabel="tipo"
            value="tipo"
            defaultValue="Otros"
            queryKey="select-tipo-raee"
            queryFn={RAEEService.obtenerTiposDispositivo}
            {...metodos.register("tipo_dispositivo")}
          />

          {/* Estado actual */}
          {errors.estado_equipo && (
            <ErrorFormulario>{errors.estado_equipo.message}</ErrorFormulario>
          )}
          <QuerySelect
            label="Estado actual"
            optionLabel="estado"
            value="estado"
            queryKey="select-estado-raee"
            queryFn={RAEEService.obtenerEstadosEquipo}
            {...metodos.register("estado_equipo")}
          />

          {/* Peso aproximado */}
          {errors.peso_aproximado && (
            <ErrorFormulario>{errors.peso_aproximado.message}</ErrorFormulario>
          )}
          <CampoContador
            initial={0}
            label="Peso aproximado (kg)"
            max={200}
            min={1}
            {...metodos.register("peso_aproximado")}
          />

          {/* Tipo de disposición */}
          {errors.tipo_disposicion && (
            <ErrorFormulario>{errors.tipo_disposicion.message}</ErrorFormulario>
          )}
          <QuerySelect
            label="Tipo de disposición"
            optionLabel="disposicion"
            value="disposicion"
            queryKey="select-tipo-disposicion"
            queryFn={RAEEService.obtenerTiposDisposicion}
            {...metodos.register("tipo_disposicion")}
          />

          {/* Punto de entrega */}
          {errors.punto_entrega && (
            <ErrorFormulario>{errors.punto_entrega.message}</ErrorFormulario>
          )}
          <QuerySelect
            label="Punto de entrega"
            optionLabel="punto"
            value="punto"
            queryKey="select-punto"
            defaultValue={"Punto principal (Unilago)"}
            queryFn={RAEEService.obtenerPuntosEntrega}
            {...metodos.register("punto_entrega")}
          />

          {/* Dirección (solo si aplica) */}
          {metodos.getValues().punto_entrega == "Recolección a domicilio" && (
            <div className="py-4 w-full">
              {errors.direccion && (
                <ErrorFormulario>{errors.direccion.message}</ErrorFormulario>
              )}
              
              {direccion && 
              <div>
                <Direccion direccion={direccion} modoCompra={true}/>
              </div>
              }
              <BotonPrimario
                negar={true}
                type="button"
                onClick={() =>
                  refDialogoDirecciones.current?.setMostrarDialogo(true)
                }
              >
                {direccion? "Seleccionar otra dirección" : "Seleccionar dirección"}
              </BotonPrimario>
            </div>
          )}

          {/* Comentarios */}
          {errors.comentarios && (
            <ErrorFormulario>{errors.comentarios.message}</ErrorFormulario>
          )}
          <div className="flex flex-col w-full py-3">
            <label className="pl-2">Comentarios adicionales</label>
          </div>
          <div className="h-36 w-full mb-24 sm:mb-12">
            <CampoFormateado name="comentarios" />
          </div>

          {/* Botón de envío */}
          <BotonPositivo
            type="submit"
            disabled={
              metodos.getValues().punto_entrega ==
              "Centro autorizado aliado (Proximamente)"
            }
          >
            Enviar
          </BotonPositivo>
        </form>
      </FormProvider>
    </>
  )
}

export default FormularioRAEE;