import { TextoClickable } from "@/components/UI";
import { VistaRol } from "@/components/wrappers";
import { DataTicket } from "@/models";
import {  useNavigate } from "react-router-dom";
import BotonAnterior from "@/components/layout/BotonAnterior"
import BotonChat from "@/components/layout/BotonChat";
import PuntoIndicador from "@/components/layout/PuntoIndicador";
import cn from "@/cn";
import { useValidarOnline } from "@/hooks/online";
import { useQuery } from "@tanstack/react-query";
import conversacionService from "@/services/conversacionService";
import { DataConversacion } from "@/models/Conversacion";
import { useRolUsuario, useSesion } from "@/hooks";
import EstrellasFeedBack from "@/components/UI/EstrellasFeedBack";
import { EstadosTicket } from "@/models/DataTicket";
import { useEffect } from "react";
import { Media } from "@/MediaConfig";
interface CabeceraTicketProps {
  ticket: DataTicket;
  abierto?: boolean;
}

const CabeceraTicket = ({ ticket,abierto }: CabeceraTicketProps) => {
  const navigate = useNavigate()
  const { info } = useSesion()
  const { isOnline: clienteOnline } = useValidarOnline(ticket.usuario?.idusuario)
  // const { isOnline: empleadoOnline } = useValidarOnline(ticket.usuario?.idusuario)
  const { data:hayConversacion,refetch } = useQuery<DataConversacion>({
    queryKey: ["conversacion", ticket.idticket],
    queryFn: () => conversacionService.obtenerConversacionUsuario(ticket.idticket),
    refetchOnWindowFocus: false,
    retry:0,
    enabled: false
  })
  const { rol } = useRolUsuario()
  useEffect(() => {
    if (rol === "cliente") refetch()
  },[])
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="flex h-full items-start sm:items-center  gap-x-3  py-2">
          {
            abierto &&
          <>
            <BotonAnterior className="transition-colors sticky top-0 left-0 pt-3 w-12 sm:w-10 sm:p-0" defaultPath="/tickets"/>
            
          </>
          }
      
          <div className="shrink pl-3 pt-2">
            <h2 className=" font-bold text-3xl">{ticket.asunto}</h2>
          
            <p className="text-lg text-slate-400">{
              ticket.tipo_servicio ? <><b>Tipo de servicio:</b> {ticket.tipo_servicio}</> : "El ticket no ha sido clasificado en un tipo de servicio"
            }</p>
            <div className="font-bold text-gray-500 inline">
              <VistaRol roles={["admin", "empleado"]}>
                {
                  ticket.usuario ?

                    <TextoClickable onClick={() => navigate({ pathname: "/tickets", search: `idusuario=${ticket.usuario?.idusuario}` })}>
                      <div className="flex items-center gap-x-2">
                        <PuntoIndicador className={cn("bg-green-300", {
                          "bg-gray-200": !clienteOnline
                        })} />
                        {ticket.usuario.nombres} {ticket.usuario.apellidos}

                      </div>
                    </TextoClickable>
                    :
                    <TextoClickable onClick={() => navigate({ pathname: "/tickets", search:`email=${ticket.email}` })}>
              Usuario no registrado - {ticket.email}
                    </TextoClickable>
                }

              </VistaRol>
              <VistaRol roles={["cliente", "admin"]}>
                
                <p className="font-normal">
                  {
                    ticket.empleado ?
                      <><b>Atendido por:</b> {ticket.empleado.nombres} {ticket.empleado.apellidos}</> :
                      <>No hay un empleado asignado</>
                  }
                </p>
              </VistaRol>
            </div>
          </div>
        </div>
        <div className="grow flex justify-end px-5">
          {
            ticket.calificacion &&
          <Media greaterThan="sm">
            <EstrellasFeedBack className="h-10" cantidad={5} valor={ticket.calificacion?.valor} readOnly />

          </Media>
          }
          {
            (!!hayConversacion || ticket.empleado_asignado === info.idusuario) &&
          ticket.estado !== EstadosTicket.RESUELTO && ticket.estado !== EstadosTicket.CERRADO &&
          <BotonChat idchat={ticket.idticket} className="transition-colors sticky top-0 left-0" />
          }

        
        </div>
      </div>
      <Media lessThan="sm">
        <div className="flex justify-end">

          <EstrellasFeedBack className="h-10" cantidad={5} valor={ticket.calificacion?.valor} readOnly />
        </div>

      </Media>
    </>
  );
}
export default CabeceraTicket;