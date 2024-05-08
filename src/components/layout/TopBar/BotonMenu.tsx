import IconoMenu from "../../icons/Menu";
import { useAppDispatch } from "../../../store";
import { abrirMenu } from "../../../store/features/TopBar";
import BotonTopBar from "./Boton";

//TODO:OPCIONAL > HACER QUE LA BARRA LATERAL SEA VISIBLE SIEMPRE EN PANTALLAS GRANDES


const BotonMenu = () => {
  
  const dispatch = useAppDispatch()

  const clickHandler = () => {
    dispatch(abrirMenu())
  }

  return (
    <BotonTopBar onClick={clickHandler}>
      <IconoMenu />
    </BotonTopBar>
  )
}


export default BotonMenu;