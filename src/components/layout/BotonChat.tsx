import cn from "@/cn"
import { useNavigate } from "react-router-dom"
import IconoChat from "../icons/Chat"

interface BotonChatProps extends React.HTMLAttributes<HTMLDivElement> {
  idchat: string
}

const BotonChat = ({ className, idchat, ...props }: BotonChatProps) => {
  const navigate = useNavigate()
  const cerrar = () => {
    if (idchat)
      return navigate(`/chats/${idchat}`)
    navigate("/chats")
  }
  return (

    <div onClick={cerrar} {...props} className={cn("flex w-12 h-12 rounded-full p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-200", className)}>
      <IconoChat />
    </div>
  )
}

export default BotonChat;