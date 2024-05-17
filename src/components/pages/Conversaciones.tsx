import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import conversacionService from "@/services/conversacionService";
import { DataConversacionTicket } from "@/models/Conversacion";
import cn from "@/cn";
import { useNavigate } from "react-router-dom";
import LogoPrincipal from "../icons/LogoPrincipal";
import { useParams } from "react-router-dom";

 
const PaginaConversaciones = () => {
  const [abierto] = useState(true)
  const { idticket } = useParams();
  const navigate = useNavigate()
  const { data: conversaciones } = useQuery<DataConversacionTicket[]>({
    queryKey: ["conversaciones"],
    queryFn: conversacionService.obtenerConversacionesUsuario,
    refetchOnWindowFocus: false,
    retry: 0
  })
  
  return (
    <div className="sm:flex min-h-0 h-[calc(100vh-3rem)] w-full">
      <div className={cn("transicion-all sm:w-72 lg:w-96 h-full overflow-y-auto border-r-2 bg-slate-100",{
        "absolute -left-full": !abierto
      })}>
        <h4 className="text-2xl font-bold p-2 text-center bg-white shadow-sm">Tus Chats</h4>
        {
          conversaciones && conversaciones.length > 0 ?
            conversaciones.map(c =>
              <div key={c.idconversacion} onClick={() => {navigate(`/chats/${c.idticket}`)}} className="flex w-full bg-white hover:bg-slate-200 p-6 border-b-2">
                <h5 className="font-bold">{c.asunto}</h5>
              </div>)
            :
            <p className="text-gray-200 text-center p-2">No tienes chats</p>
        }
      </div>
      <div className="sm:grow h-full relative">
        {

        }
        <div className="absolute flex justify-center items-center w-full h-full -z-40">
          <div className="h-96">

            <LogoPrincipal fill="#eeeeee"/>
          </div>
        </div>
        <Outlet key={idticket}/>
      </div>
    </div>
  );
}
 
export default PaginaConversaciones;