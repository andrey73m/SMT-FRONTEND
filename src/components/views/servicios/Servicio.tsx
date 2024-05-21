import cn from "@/cn";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar";
import FormularioServicio from "@/components/formularios/servicio";
import { ImagenCircular } from "@/components/layout/FormatoImagenes";
import BotonEditar from "@/components/layout/general/BotonEditar";
import BotonEliminar from "@/components/layout/general/BotonEliminar";
import { DataServicio } from "@/models";
import { useRef } from "react";

interface ServicioProps {
  servicio: DataServicio;
  esPar?: boolean;
  botones?: boolean
}

const Servicio = ({ servicio, botones = true, esPar = true }: ServicioProps) => {

  const referenciaDialogo = useRef<tipoReferencia>(null)
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)

  const handleDelete = async () => {
    
  }

  return (
    <div
      className={cn("flex flex-col lg:flex-row w-full items-center p-0 md:p-5 h-auto border-b-2 border-gray-300", {
        "justify-start ": esPar, "lg:flex-row-reverse": !esPar
      })}>
      
      <ImagenCircular className="m-3 lg:rounded-full h-80 w-full lg:mb-0 lg:w-80" url_imagen={servicio.url_imagen} />
      <div className={cn("w-full lg:w-3/5", {
        "text-left": esPar, "lg:text-right": !esPar
      })}>
        <h3 className="font-bold text-3xl mb-5">{servicio.tipo_servicio}</h3>
        <p className="text-2xl leading-10">{servicio.descripcion}</p>
      </div>
      {
        botones &&
        <div className={cn("my-7 mx-2 flex h-16 grow",{
          "justify-end": esPar
        })}>

          <DialogoMostrar className="overflow-y-auto max-h-[calc(100vh-3rem)] w-4/5"  sinLimites ref={referenciaDialogo}>
            <FormularioServicio afterSubmit={() => referenciaDialogo.current?.setMostrarDialogo(false)} modoActualizar servicio={servicio} />
          </DialogoMostrar>

          <DialogoConfirmar ejecutarAccion={handleDelete} titulo="¿Estás seguro de eliminar este servicio?" ref={referenciaConfirmacion}>
          </DialogoConfirmar>

          <BotonEditar className="" onClick={() => referenciaDialogo.current?.setMostrarDialogo(true)} />

          <BotonEliminar onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)} />
        </div>
      }
    </div>
  )
}

export default Servicio;