import Cupones from "../views/promociones/cupones";

interface DialgoCuponesProps {
  afterSelect: () => void
}

const DialogoCupones = ({ afterSelect }: DialgoCuponesProps) => {

  return(
    <>
      <div className= "w-full flex flex-col items-center justify-normal  font-bold text-3xl">
        Selecciona un cupón
      </div>
      <Cupones modoCompra afterSelect={afterSelect}/>
    </>
  )
}

export default DialogoCupones;