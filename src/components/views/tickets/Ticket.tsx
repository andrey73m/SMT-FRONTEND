import ticketService from "@/services/ticketService";
import { VistaRol } from "@/components/wrappers"
import BotonNegativo from "@/components/UI/Botones/BotonNegativo";
import { DataTicket } from "@/models";
import cn from "@/cn";
import BotonPositivo from "@/components/UI/Botones/BotonPositivo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSesion } from "@/hooks";
import { useNavigate } from "react-router-dom";
import CabeceraTicket from "./CabeceraTicket";
import { BotonPrimario, BotonSecundario } from "@/components/UI/Botones";
import CuerpoTicket from "./CuerpoTicket";
import AlternarFormularioGestionarTicket from "@/components/layout/AlternarFormularioGestion";
import { EstadosTicket } from "@/models/DataTicket";
import { AxiosError } from "axios";
import { notificarError, notificarExito } from "@/utils";
import DialogoConfirmar, { tipoReferenciaConfirmar } from "@/components/UI/DialogoConfirmar";
import { useRef, useState } from "react";
import BotonNeutro from "@/components/UI/Botones/BotonNeutro";
import FormularioCalificacion from "@/components/formularios/calificar_ticket";
import { TextoClickable } from "@/components/UI";

interface TicketProps{
  ticket: DataTicket
  idticket?: string
  // eslint-disable-next-line no-unused-vars
}
 


const Ticket = ({ ticket, idticket }: TicketProps) => {
  const [mostrarComentario, setMostrarComentario] = useState(false)
  const [mostrarFormularioCalificar, setmostrarFormularioCalificar] = useState(false)
  const { info } = useSesion()
  const queryClient = useQueryClient()
  const actualizarQueryTickets = (updated: DataTicket) =>
    queryClient.setQueryData(["tickets"],(data: DataTicket[]) =>
      data?.map(ticket => ticket.idticket === updated.idticket ? updated : ticket))
  const abierto = idticket === ticket.idticket
  const acceptMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.aceptarTicket(ticket.idticket),
    onSuccess: (updated) => {
      actualizarQueryTickets(updated)
      
    },
    onError: (error) => {
      const e = error as AxiosError
      if (e.response?.status === 409){
        notificarError("Este ticket ya fue aceptado")
      }
    }
  })
  const discardMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.descartarTicketUsuario(ticket.idticket),
    onSuccess: (updated) => {
      actualizarQueryTickets(updated)
      notificarExito("Ticket descartado")
    },
    onError: () => {
      notificarError("No se pudo descartar el ticket")
    }
  })
  const reopenMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.reabrirTicket(ticket.idticket),
    onSuccess: (updated) => {
      actualizarQueryTickets(updated)
      notificarExito("Ticket reabierto")
    },
    onError: () => {
      notificarError("No se pudo reabrir el ticket")
    }
  })
  const resolveMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.resolverTicket(ticket.idticket),
    onSuccess: (updated) => {
      actualizarQueryTickets(updated)
      notificarExito("Ticket resuelto")
    },
    onError: () => {
      notificarError("No se pudo resolver el ticket")
    }
  })

  const solicitarMutation = useMutation<DataTicket>({
    mutationFn: () => ticketService.solicitarReaperturaTicket(ticket.idticket),
    onSuccess: (updated) => {
      actualizarQueryTickets(updated)
      notificarExito("Ticket reabierto, pronto el técnico asignado tomará acciones")
    },
    onError: () => {
      notificarError("No se pudo reabrir el ticket")
    }
  })

  const handleSolve = async () => {
    resolveMutation.mutate()
  }
  const handleAccept = async () => {
    acceptMutation.mutate()
  }
  const handleDiscard = async () => {
    discardMutation.mutate()
  }
  const handleReopen = async () => {
    reopenMutation.mutate()
  }
  const handleSolicitud = async () => {
    solicitarMutation.mutate()
  }
  const referenciaConfirmacion = useRef<tipoReferenciaConfirmar>(null)
  const refConfirmacionResolver = useRef<tipoReferenciaConfirmar>(null)
  const referenciaSolicitud = useRef<tipoReferenciaConfirmar>(null)
  const referenciaReabrir = useRef<tipoReferenciaConfirmar>(null)

  const navigate = useNavigate()
  //TODO:OPCIONAL > USAR FRESNEL PARA MANEJO DE MEDIAQUERY
  return(
    <>
      <div  className={cn("bg-white flex w-full flex-col relative transition-all  overflow-y-auto", {
        "z-10 border-2 px-5 py-5": !abierto,
        "h-full fixed left-0 top-0 pt-topbar p-3 w-full z-40": abierto
      })}>
        <CabeceraTicket abierto={abierto} ticket={ticket}/>
        <div className="border-b-2 border-gray-2 w-full py-2"/>
        <CuerpoTicket ticket={ticket}/>
        {
          abierto &&
            <>
              {
                ticket.estado !== EstadosTicket.CERRADO && ticket.estado !== EstadosTicket.RESUELTO ?
                  <>
                    <DialogoConfirmar ejecutarAccion={handleDiscard} titulo="¿Estás seguro de descartar este ticket?" ref= {referenciaConfirmacion} detalles="Solo un admin podrá reabrirlo"/>
                    <DialogoConfirmar ejecutarAccion={handleSolve} titulo="¿Estás seguro de resolver el ticket ahora?" ref={refConfirmacionResolver} />
                    
                    
                    <VistaRol roles={["admin", "empleado"]}>
          
                      <VistaRol roles={["admin"]} or={ticket.empleado_asignado === info.idusuario}>
                        <div className="flex flex-col gap-y-2">

                          <AlternarFormularioGestionarTicket recienAceptado={ticket.estado === EstadosTicket.ACEPTADO} ticket={ticket} />
                          {
                            ticket.prioridad && ticket.idtipo_servicio && ticket.empleado_asignado === info.idusuario &&
                          <BotonNeutro onClick={() => refConfirmacionResolver.current?.setMostrarConfirmacion(true)}>Marcar como resuelto</BotonNeutro>
                          }
                        </div>
                      </VistaRol>
                      <div className="flex flex-col sm:flex-row gap-2 my-2 transition-all">
                        <>
                          {
                            !ticket.empleado_asignado &&
                            <VistaRol roles={["empleado"]}>
                              <div className="grow">

                                <BotonPositivo onClick={handleAccept}>Aceptar</BotonPositivo>
                              </div>
                              <div className="grow">

                                
                                <BotonNegativo negar onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)}>Descartar</BotonNegativo>
                              </div>
                            </VistaRol>
                          }
                          {
                            ticket.empleado_asignado &&
                            <div className="grow flex justify-end">

                              <BotonNegativo className="" simplificar onClick={() => referenciaConfirmacion.current?.setMostrarConfirmacion(true)}>Descartar</BotonNegativo>
                            </div>
                          }
                        </>
                      </div>
                    </VistaRol>
                  </>
                  :
                  <>
                    {
                      ticket.calificacion && ticket.calificacion.comentario &&
                      <>
                        <span className="inline-block p-2 py-4 text-right">
                          <TextoClickable onClick={() => setMostrarComentario(!mostrarComentario)} className="text-slate-500 underline hover:font-bold ">Ver comentario del cliente</TextoClickable>
                        </span>
                        {
                          <section className={cn("border-b-2 my-2 border-t-2 p-4 transition-all",{
                            "hidden": !mostrarComentario
                          })}>
                            <h5 className="font-bold text-xl">Comentario del cliente</h5>
                            <p>{ticket.calificacion.comentario}</p>
                          </section>

                        }
                      </>
                    }
                    {
                      ticket.estado === EstadosTicket.CERRADO &&
                      <VistaRol roles={["admin"]}>
                        <DialogoConfirmar ejecutarAccion={handleReopen} titulo="¿Estás seguro de resolver el ticket ahora?" ref={referenciaReabrir} />
                        <BotonSecundario onClick={() => referenciaReabrir.current?.setMostrarConfirmacion(true)}>Reabrir</BotonSecundario>
                      </VistaRol>
                    }
                    {
                      ticket.estado === EstadosTicket.RESUELTO &&
                      <>
                        {!ticket.calificacion &&
                          <VistaRol roles={["cliente"]}>
                            <DialogoConfirmar ejecutarAccion={handleSolicitud} titulo="¿Estás seguro de reabrir el ticket?" ref={referenciaSolicitud} />
                            <div className="flex flex-col gap-y-2">

                              <BotonPositivo onClick={() => setmostrarFormularioCalificar(!mostrarFormularioCalificar)}>Calificar</BotonPositivo>
                              {
                                mostrarFormularioCalificar &&
                              <FormularioCalificacion ticket={ticket}/>
                              }
                              <BotonSecundario simplificar onClick={() => referenciaSolicitud.current?.setMostrarConfirmacion(true) }>¿No estas satisfecho con esta decisión? Haz click para reabrir tu ticket</BotonSecundario>

                            </div>
                          </VistaRol>
                        }
                      </>
                    }
                  </>
              }
            </>
        
        //TODO CONDICIONES PARA CLASIFICACION DE LOS ADMINS
        }
        
        {!abierto && <BotonPrimario negar className="my-2" onClick={() => navigate(`/tickets/${ticket.idticket}`)}>Ir a detalles</BotonPrimario>}
      </div>
    </>
  )
  ;
}
 
export default Ticket;