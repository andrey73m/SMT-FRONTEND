import { SetStateAction, forwardRef, useImperativeHandle, useState, Dispatch } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { BotonNegativo, BotonPositivo } from "./Botones";


export interface tipoReferenciaConfirmar{
  setMostrarConfirmacion:  Dispatch<SetStateAction<boolean>>
}
interface DialogoProps{
  titulo?: string
  ejecutarAccion: ()=>void
}

const DialogoConfirmar = forwardRef<tipoReferenciaConfirmar, DialogoProps>(({ titulo, ejecutarAccion },ref) => {

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const handleOpen = () => setMostrarConfirmacion(!mostrarConfirmacion);

  useImperativeHandle(ref, () => ({
    setMostrarConfirmacion
  }));

  const handleClick = () => {
    ejecutarAccion()
    handleOpen()
  }
  const MyDialog = Dialog as any
  const MyDialogHeader = DialogHeader as any
  const MyDialogBody = DialogBody as any

  return(
    <>
      <MyDialog open={mostrarConfirmacion} handler={handleOpen}>
        <MyDialogHeader className="flex justify-center">{titulo}</MyDialogHeader>
        <MyDialogBody>
          <div className="flex w-full">
            <BotonPositivo onClick={handleClick} className="m-2">Confirmar</BotonPositivo>
            <BotonNegativo className="m-2" onClick={() => setMostrarConfirmacion(false)}>Descartar</BotonNegativo>
          </div>
        </MyDialogBody>
      </MyDialog>
    </>
  )

})

DialogoConfirmar.displayName = "DialogoConfirmar"

export default DialogoConfirmar;