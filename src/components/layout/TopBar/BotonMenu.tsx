import IconoMenu from "@/components/icons/Menu";
import { useAppDispatch } from "@/store";
import { abrirMenu } from "@/store/features/TopBar";
import BotonTopBar from "./Boton";

//TODO:OPCIONAL > HACER QUE LA BARRA LATERAL SEA VISIBLE SIEMPRE EN PANTALLAS GRANDES


const BotonMenu = () => {
  
  const dispatch = useAppDispatch()

  const clickHandler = () => {
    dispatch(abrirMenu())
  }

  return (
    <BotonTopBar className="w-12" onClick={clickHandler}>
      <IconoMenu className="w-12"/>
    </BotonTopBar>
  )
}


export default BotonMenu;