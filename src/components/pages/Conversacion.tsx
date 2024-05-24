import { useEffect, useRef, useState } from "react";

import {  BotonPrimario } from "../UI/Botones";
import IconoEnvio from "../icons/Envio";
import { socketService } from "@/services/socketService";
import { useNavigate, useParams } from "react-router-dom";

import { DataMensajeRecibido } from "@/models/Conversacion";
import cn from "@/cn";
import { useQueryMensajes, useQueryTicketConversacion, useSesion, useValidarOnline } from "@/hooks";
import { formatearHora } from "@/utils";
import {  Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import IconoFlecha from "@/components/icons/Flecha"
import PuntoIndicador from "../layout/PuntoIndicador";
import { isAxiosError } from "axios";
import { SpinnerPagina } from "../UI";



interface MensajeProps{
  mensaje: DataMensajeRecibido
}
const Mensaje = ({ mensaje }: MensajeProps) => {
  const { info:{ idusuario } } = useSesion()
  const itsMine = mensaje.idemisor === idusuario
  return (
    <div className={cn("flex w-full",{
      "justify-end": itsMine
    })}>
      <div className={cn("w-3/5 sm:w-96 bg-slate-200 rounded-lg p-2",{
        "bg-violet-700 text-white":itsMine
      })}>
        <p>{mensaje.contenido}</p>
        {/* <p className="text-end">{formatoHora.format(mensaje.fecha_envio)}</p> */}
        <p className={cn("text-end text-xs text-slate-400",{
          "text-violet-100": itsMine
        })}>{formatearHora(mensaje.fecha_envio)}</p>
      </div>
    </div>
  )
}
const PaginaConversacion = () => {
  const { idticket } = useParams();
  
  const queryClient = useQueryClient();
  const { data:ticket, isError, error } = useQueryTicketConversacion(idticket)
  const usuarioChat = ticket?.usuario || ticket?.empleado;
  const { isOnline: onlineToChat } = useValidarOnline(usuarioChat?.idusuario)
  const navigate = useNavigate()
  
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { data: mensajes, isFetching: mensajesIsFetching, isSuccess: mensajesIsSuccess } = useQueryMensajes(idticket)
  
  const [contenido, setContenido] = useState("")
  useEffect(() => {

    if (isError) {
      if (isAxiosError(error)) {
        switch (error.response?.status) {
        case 404:
          navigate("/chats")
        }
      }
    }
  }, [isError])
  useEffect(() => {
    elementRef.current?.scrollIntoView()
  }, [mensajes])
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["mensajes-conversacion"] })

    }
  }, [])
  const enviar = () => {
    if (idticket && contenido.length > 0) {
      socketService.emit("chat:enviar-mensaje", {
        idticket,
        contenido,
        fecha_envio: new Date(),
      }, (mensaje) => {
        queryClient.setQueryData<DataMensajeRecibido[]>(["mensajes-conversacion"], (mensajes) => {
          if (!mensajes) return [mensaje]
          return mensajes.concat(mensaje)
        })
      })
      setContenido("")
    }
  }
  const enviarMensaje: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    enviar()
    
  }
  

  console.log(ticket)
  //TODO:OPCIONAL > ARREGLAR PROBLEMA DEL TECLADO DE CELULAR QUE DESPLAZA EL CHAT
  return (
    <div className="flex flex-col w-full h-full justify-around bg-white ">
      {/* {
        isLoading &&
        <SpinnerPagina/>
      } */}
      {
        ticket &&
        <>
          {/*CABECERA DEL CHAT*/}
          <div className="flex items-center w-full bg-violet-700 px-2">
            <div className="w-8 h-8 p-1 text-white hover:text-violet-200 rounded-full bg-violet-600 hover:bg-violet-700 sm:hidden">
              <Link to="/chats">
                <IconoFlecha />
              </Link>
            </div>
            <div className=" grow  text-white  text-center sm:text-left shadow-sm py-2 sm:pl-4">
            
              <h3 className="font-bold text-xl ">{ticket.asunto}</h3>
              <p className="text-lg text-violet-400">{
                ticket.tipo_servicio ? ticket.tipo_servicio : "El ticket no ha sido clasificado en un tipo de servicio"
              }</p>
              {
                usuarioChat &&
                <div className="flex gap-x-2 items-center">
                  <PuntoIndicador className={cn("bg-green-300 inline sm:hidden", {
                    "bg-gray-200": !onlineToChat
                  })} />
                  <p className="text-violet-100">{usuarioChat.nombres} {usuarioChat.apellidos}</p>

                </div>
                
              }
            </div>
          </div>
          {/*CUERPO DEL CHAT*/}
          <div className="grow overflow-y-auto w-full flex flex-col gap-y-5 pt-3 p-1 px-3">
            <>
              {
                mensajesIsFetching ?
                  <SpinnerPagina/> :
                  mensajesIsSuccess && mensajes.map(m =>
                    <Mensaje key={m.idmensaje} mensaje={m} />
                  )
              }
            </>
            <div ref={elementRef}/>
          </div>
          {/*PIE DEL CHAT*/}
          <div className="flex min-h-16 max-h-32 w-full pb-2 px-4 items-end">
            <form className="h-full flex gap-x-2 w-full">
              <textarea
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    enviar()
                  }
                }}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="grow w-full rounded-xl border-2 transition-all duration-500 bg-white px-4 pt-2 resize-none align-baseline focus:outline-none focus:border-violet-700"
                rows={1}
                placeholder="Escribe un mensaje" />
              <div className="h-full w-14 content-end">
                <BotonPrimario onClick={enviarMensaje}><IconoEnvio /></BotonPrimario>

              </div>
            </form>

          </div>
        </>
      }
      
    </div>
  );
}
 
export default PaginaConversacion;