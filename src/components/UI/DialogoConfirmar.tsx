import { SetStateAction, forwardRef, useImperativeHandle, useState, Dispatch } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { BotonNegativo, BotonPositivo } from "./Botones";


export interface tipoReferenciaConfirmar{
  setMostrarConfirmacion:  Dispatch<SetStateAction<boolean>>
}
interface DialogoProps{
  titulo?: string
  detalles?: string
  ejecutarAccion: ()=>void
}

const DialogoConfirmar = forwardRef<tipoReferenciaConfirmar, DialogoProps>(({ titulo, detalles, ejecutarAccion },ref) => {

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
        <MyDialogHeader className="flex justify-center p-0 px-3 pt-2 text-center">
          <h3>{titulo}</h3>
        </MyDialogHeader>
        <MyDialogBody className="p-1">
          {detalles && <p className="text-slate-400 text-center text-lg mb-2">{detalles}</p>}
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