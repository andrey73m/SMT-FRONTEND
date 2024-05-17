import { useEffect, useRef, useState } from "react";

import {  BotonPrimario } from "../UI/Botones";
import IconoEnvio from "../icons/Envio";
import { socketService } from "@/services/socketService";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ticketService from "@/services/ticketService";
import { SpinnerPagina } from "../UI";
import { DataTicket } from "@/models";
import conversacionService from "@/services/conversacionService";
import { DataMensajeRecibido } from "@/models/Conversacion";
import cn from "@/cn";
import { useSesion } from "@/hooks";
import { formatearHora } from "@/utils";
import { VistaRol } from "../wrappers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface PaginConversacionProps {
  
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null);
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};


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
      <div className={cn("w-96 bg-slate-200 rounded-lg p-2",{
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
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { data: ticket, isFetching, isLoading, isSuccess, isError, error } = useQuery<DataTicket>({
    queryKey: ["ticket", "ticket-conversacion"],
    queryFn: () => ticketService.getTicket(idticket),
    refetchOnWindowFocus: false,
    retry: 0
  })
  useEffect(() => {

    if (isError) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
        case 404:
          navigate("/chats")
        }
      }
    }
  }, [isError])
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["mensajes-conversacion"] })
    }
  },[])

  const { data: mensajes, isLoading: mensajesIsLoading, isSuccess: mensajesIsSuccess } = useQuery<DataMensajeRecibido[]>({
    queryKey: ["mensajes-conversacion"],
    queryFn: () => conversacionService.cargarMensajesConversacion(idticket),
    refetchOnWindowFocus: true,
    retry: 0
  })
  const refDisplay = useRef<HTMLDivElement>(null)

  const [contenido, setContenido] = useState("")
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
      console.log("reset contenido")
      setContenido("")
    }
  }
  const enviarMensaje: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    enviar()
    
  }
  return (
    <div className="flex flex-col w-full h-full justify-around border-l-2 bg-white">
      {
        isLoading &&
        <SpinnerPagina/>
      }
      {
        isSuccess && ticket &&
        <>
          {/*CABECERA DEL CHAT*/}
          <div className=" w-full bg-violet-700 text-white shadow-sm p-2 pl-10">
            <h3 className="font-bold text-xl">{ticket.asunto}</h3>

            <VistaRol roles={["empleado", "admin"]}>
              {
                ticket.usuario &&
                <p className="text-violet-100">{ticket.usuario.nombres} {ticket.usuario?.apellidos}</p>

              }
            </VistaRol>
          </div>
          {/*CUERPO DEL CHAT*/}
          <div className="grow overflow-y-auto w-full flex flex-col gap-y-5  p-1 px-3">
            <>
              {
                mensajesIsSuccess && mensajes.map(m =>
                  <Mensaje key={m.idmensaje} mensaje={m} />
                )
              }
              <AlwaysScrollToBottom/>
            </>
          </div>
          {/*PIE DEL CHAT*/}
          <div className="flex min-h-16 max-h-32 w-full pb-2 px-4 items-end">
            <form className="h-full flex gap-x-2 w-full">
              <textarea
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    enviar()
                    // Perform your action here
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