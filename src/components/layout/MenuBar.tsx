import IconoMenu from "../icons/Menu";
import MenuFlotante from "./MenuFlotante";
import { useAppDispatch } from "../../store";
import { abrirMenu } from "../../store/features/TopBar";

//TODO:OPCIONAL > HACER QUE LA BARRA LATERAL SEA VISIBLE SIEMPRE EN PANTALLAS GRANDES


const BotonMenu = () => {
  
  const dispatch = useAppDispatch()

  const clickHandler = () => {
    dispatch(abrirMenu())
  }

  return (
    <>
      <IconoMenu onMouseDown={clickHandler}/>
      <MenuFlotante/>
    </>
  )
}


export default BotonMenu;