import { SetStateAction, forwardRef, useImperativeHandle, useState, Dispatch } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { BotonNegativo, BotonPositivo } from "./Botones";


export interface tipoReferenciaConfirmar{
  setMostrarConfirmacion:  Dispatch<SetStateAction<boolean>>
}
interface DialogoProps{
  titulo?: string
  ejecutarAccion: ()=>void
}

const DialogoConfirmar = forwardRef<tipoReferenciaConfirmar, DialogoProps>(({ titulo, ejecutarAccion, ...props },ref) => {

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const handleOpen = () => setMostrarConfirmacion(!mostrarConfirmacion);

  useImperativeHandle(ref, () => ({
    setMostrarConfirmacion
  }));

  const handleClick = () => {
    ejecutarAccion()
    handleOpen()
  }

  return(
    <>
      <Dialog open={mostrarConfirmacion} handler={handleOpen}>
        <DialogHeader className="flex justify-center">{titulo}</DialogHeader>
        <DialogBody>
          <div className="flex w-full">
            <BotonPositivo onClick={handleClick} className="m-2">Confirmar</BotonPositivo>
            <BotonNegativo className="m-2" onClick={() => setMostrarConfirmacion(false)}>Descartar</BotonNegativo>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )

})

DialogoConfirmar.displayName = "DialogoConfirmar"

export default DialogoConfirmar;