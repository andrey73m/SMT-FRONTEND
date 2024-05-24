import IconoChat from "@/components/icons/Chat";
import BotonTopBar from "./Boton";
import { useNavigate,useLocation } from "react-router-dom";
import PuntoIndicador from "../PuntoIndicador";
import { useAppSelector,useAppDispatch } from "@/store";
import { useEffect } from "react";
import { setSignoChat } from "@/store/features/TopBar";

const BotonChatTopBar = () => {
  
  const navigate = useNavigate()
  const { nuevos } = useAppSelector(state => state.topBar.signoChat)
  const location = useLocation();
  const handleClick = () => {
    navigate("/chats")
  }

  const dispatch = useAppDispatch()
  useEffect(() => {
    const isInChats = location.pathname.startsWith("/chats");
    if (isInChats){

      dispatch(setSignoChat(false))
    }
  },[nuevos, location])

  return(
    <>
      <BotonTopBar className="w-12" onClick={handleClick}>
        <IconoChat/>
        {nuevos &&
          <PuntoIndicador className="absolute right-1 bottom-1" />
        }
      </BotonTopBar>
    </>
  )
}

export default BotonChatTopBar;