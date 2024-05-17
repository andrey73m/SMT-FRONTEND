import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import IconoSimboloX from "../icons/SimboloX";
import { forwardRef, useImperativeHandle, useState, Dispatch, SetStateAction } from "react";

export interface tipoReferencia{
  setMostrarDialogo:  Dispatch<SetStateAction<boolean>>
}
const DialogoMostrar = forwardRef<tipoReferencia, React.PropsWithChildren>(({ ...props },ref) => {

  const [mostrarDialogo, setMostrarDialogo] = useState(false)
 
  const handleOpen = () => {
    console.log("CLICK")
    setMostrarDialogo(!mostrarDialogo)
  };

  useImperativeHandle(ref, () => ({
    setMostrarDialogo
  }))
  
  return(
    <>
      <Dialog open={mostrarDialogo} handler={handleOpen}>
        <DialogBody>
          <div className="relative">
            <div className="flex justify-end absolute w-full z-50 h-6">
              <IconoSimboloX  onClick={handleOpen} className="cursor-pointer hover:text-red-700" />
            </div>
            {props.children}
          </div>
        </DialogBody>
      </Dialog>
    </>
  )

})

DialogoMostrar.displayName = "DialogoMostrar"

export default DialogoMostrar;