import { Dialog, DialogBody } from "@material-tailwind/react";
import IconoSimboloX from "../icons/SimboloX";
import { forwardRef, useImperativeHandle, useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import cn from "@/cn";


interface DialogoMostrarProps extends React.HTMLAttributes < HTMLDivElement >{
  sinLimites?: boolean
  bodyClassName?: string
}

export interface tipoReferencia{
  setMostrarDialogo:  Dispatch<SetStateAction<boolean>>
}
const DialogoMostrar = forwardRef<tipoReferencia, DialogoMostrarProps>(({ className, bodyClassName, sinLimites,...props },ref) => {

  const [mostrarDialogo, setMostrarDialogo] = useState(false)
  
  const dialogoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clasesLimitantes = [
      "w-full",
      "md:w-3/4",
      "2xl:w-2/5",
      "min-w-[90%]",
      "md:min-w-[75%]",
      "lg:min-w-[60%]",
      "2xl:min-w-[40%]",
      "max-w-[90%]",
      "md:max-w-[75%]",
      "lg:max-w-[60%]",
      "2xl:max-w-[40%]",
      "md:w-3/4","lg:w-3/5","2xl:w-2/5","min-w-[90%]","md:min-w-[75%]","lg:min-w-[60%]","2xl:min-w-[40%]","max-w-[90%]","md:max-w-[75%]","lg:max-w-[60%]","2xl:max-w-[40%]"
    ]
    if (sinLimites)
      clasesLimitantes.forEach(clase => {
        if (dialogoRef.current)
          dialogoRef.current.classList.remove(clase);
      });
  })

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
      <MyDialog ref={dialogoRef} open={mostrarDialogo} handler={handleOpen} className={cn({
        "min-w-0 sm:min-w-0 md:min-w-0 lg:min-w-0 xl:min-w-0 2xl:min-w-0 w-full sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full 2xl:max-w-full": false
      }, className)}>
        <MyDialogBody >
          <div className={cn("relative", bodyClassName)}>
            <div className="flex sticky top-0 p-4 bg-white h-8 items-center  ">

              <div className="flex justify-end w-full z-50 pr-4">
                <IconoSimboloX  onClick={handleOpen} className="cursor-pointer hover:text-red-700 w-6" />
              </div>
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