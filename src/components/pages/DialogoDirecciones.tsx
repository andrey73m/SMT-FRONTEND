import Direcciones from "../views/direcciones/VistaDirecciones";

interface DialgoDireccionesProps {
  afterSelect: () => void
}

const DialogoDirecciones = ({ afterSelect }: DialgoDireccionesProps) => {

  return(
    <>
      <div className= "w-full flex flex-col items-center justify-normal  font-bold text-3xl">
        Selecciona una dirección de envío
      </div>
      <Direcciones modoCompra afterSelect={afterSelect}/>
    </>
  )
}

export default DialogoDirecciones;