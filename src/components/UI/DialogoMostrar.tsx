import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";



const DialogoMostrar = ({ ...props }) => {

  const [mostrarDialogo, setMostrarDialogo] = useState(true)
 
  const handleOpen = () => setMostrarDialogo(!mostrarDialogo);

  
  return(
    <>
      <Dialog open={mostrarDialogo} handler={handleOpen}>
        <DialogBody>
          {props.children}
        </DialogBody>
      </Dialog>
    </>
  )

}
export default DialogoMostrar;