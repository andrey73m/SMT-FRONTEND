import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { BotonNegativo, BotonPositivo } from "./Botones";

const DialogoConfirmar = () => {
  const [mostrarDialogo, setMostrarDialogo] = useState(true)
 
  const handleOpen = () => setMostrarDialogo(!mostrarDialogo);

  return(
    <>
      <Dialog open={mostrarDialogo} handler={handleOpen}>
        <DialogHeader className="flex justify-center">¿Estás seguro de eliminar la dirección?</DialogHeader>
        <DialogBody>
          <div className="flex w-full">
            <BotonPositivo className="m-2">Confirmar</BotonPositivo>
            <BotonNegativo className="m-2">Descartar</BotonNegativo>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )

}

export default DialogoConfirmar;