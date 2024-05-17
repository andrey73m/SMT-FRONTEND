import BotonEditar from "@/components/layout/general/BotonEditar";
import BotonEliminar from "@/components/layout/general/BotonEliminar";
import DataDireccion from "@/models/DataDireccion";
import FormularioDireccion from "@/components/formularios/direccion";
import DialogoMostrar from "@/components/UI/DialogoMostrar";
import { useRef } from "react";
import { tipoReferencia } from "@/components/UI/DialogoMostrar";
import { useMutacionEliminarDireccion } from "@/hooks/direcciones";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
interface DireccionesProps {
  direccion: DataDireccion
}

const Direccion = ({ direccion, }: DireccionesProps) => {
  
  const referenciaDialogo = useRef<tipoReferencia>()
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>()

  const mutacionEliminarDireccion = useMutacionEliminarDireccion();

  const handleDelete = async () => {
    if (direccion.iddireccion)
      mutacionEliminarDireccion.mutate(direccion.iddireccion)
  }

  return (
    <>
      <div className="rounded-xl bg-white w-auto">
        <div className="flex justify-end h-0">
          <div className="my-7 mx-2 flex justify-end min-h-10">

            <DialogoMostrar ref={referenciaDialogo}>
              <FormularioDireccion afterSubmit={() => referenciaDialogo.current?.setMostrarDialogo(false)} modoActualizar direccion={direccion}/>
            </DialogoMostrar>

            <DialogoConfirmar ejecutarAccion={handleDelete} titulo="¿Estás seguro de eliminar la dirección?" ref={referenciaConfirmacion}>
            </DialogoConfirmar>
            
            <BotonEditar onClick={() => referenciaDialogo.current?.setMostrarDialogo(true)}/>
            
            <BotonEliminar onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)}/>
          </div>
        </div>
        
        <div className="p-2 *:leading-10">
          <p className=" text-2xl">{direccion.cadena_direccion}</p>
          <p className="font-light text-xl">{direccion.barrio}</p>
          {
            direccion.predeterminada &&
          <p className="font-light text-xl">(Es tu direccion predeterminada)</p>
          }
        </div>
      </div>
    </>
  
  )

}

export default Direccion;
