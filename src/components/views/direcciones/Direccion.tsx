import BotonEditar from "@/components/layout/general/BotonEditar";
import BotonEliminar from "@/components/layout/general/BotonEliminar";
import DataDireccion from "@/models/DataDireccion";
import FormularioDireccion from "@/components/formularios/direccion";
import DialogoMostrar from "@/components/UI/DialogoMostrar";
import { useRef } from "react";
import { tipoReferencia } from "@/components/UI/DialogoMostrar";
import { useMutacionEliminarDireccion } from "@/hooks/direcciones";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
import { VistaRol } from "@/components/wrappers";
interface DireccionesProps {
  direccion: DataDireccion
}

const Direccion = ({ direccion, }: DireccionesProps) => {
  
  const referenciaDialogo = useRef<tipoReferencia>(null)
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)

  const mutacionEliminarDireccion = useMutacionEliminarDireccion();

  const handleDelete = async () => {
    if (direccion.iddireccion)
      mutacionEliminarDireccion.mutate(direccion.iddireccion)
  }

  return (
    <>
      <div className="rounded-xl bg-white w-auto">
        <div className="flex justify-end h-0">
          <div className="my-7 mx-2 flex justify-end h-10">

            <DialogoMostrar ref={referenciaDialogo}>
              <FormularioDireccion afterSubmit={() => referenciaDialogo.current?.setMostrarDialogo(false)} modoActualizar direccion={direccion}/>
            </DialogoMostrar>

            <DialogoConfirmar ejecutarAccion={handleDelete} titulo="¿Estás seguro de eliminar la dirección?" ref={referenciaConfirmacion}>
            </DialogoConfirmar>
            
            <BotonEditar className="w-10" onClick={() => referenciaDialogo.current?.setMostrarDialogo(true)}/>
            
            <BotonEliminar className="w-10" onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)}/>
          </div>
        </div>
        
        <div className="p-2 *:leading-10">
          <p className=" text-2xl">{direccion.cadena_direccion}</p>
          <p className=" text-xl text-slate-500">{direccion.municipio}, {direccion.departamento}</p>
          <p className="font-light text-lg">{direccion.barrio}</p>
          {
            direccion.predeterminada &&
            <>
              <VistaRol roles={["cliente"]}>
                <p className="font-light text-xl">(Es tu direccion predeterminada)</p>
              </VistaRol>

              <VistaRol roles={["admin"]}>
                <p className="font-light text-xl">(Predeterminada)</p>
              </VistaRol>
            </>
          
          }
        </div>
      </div>
    </>
  
  )

}

export default Direccion;
