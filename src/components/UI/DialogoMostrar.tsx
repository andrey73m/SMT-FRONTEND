import { Dialog, DialogBody } from "@material-tailwind/react";
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
  const MyDialog = Dialog as any
  const MyDialogBody = DialogBody as any
  
  return(
    <>
      <MyDialog open={mostrarDialogo} handler={handleOpen}>
        <MyDialogBody>
          <div className="relative">
            <div className="flex justify-end absolute w-full z-50 h-6">
              <IconoSimboloX  onClick={handleOpen} className="cursor-pointer hover:text-red-700 w-6" />
            </div>
            {props.children}
          </div>
        </MyDialogBody>
      </MyDialog>
    </>
  )

})

DialogoMostrar.displayName = "DialogoMostrar"

export default DialogoMostrar;