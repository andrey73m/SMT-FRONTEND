import { TextoClickable } from "@/components/UI";
import { VistaRol } from "@/components/wrappers";
import { DataTicket } from "@/models";
import {  useNavigate } from "react-router-dom";
import BotonAnterior from "@/components/layout/BotonAnterior"
import BotonChat from "@/components/layout/BotonChat";
import PuntoIndicador from "@/components/layout/PuntoIndicador";
import cn from "@/cn";
import { useOnline, useValidarOnline } from "@/hooks/online";
import DialogoConfirmar from "@/components/UI/DialogoConfirmar";
import { useQuery } from "@tanstack/react-query";
import conversacionService from "@/services/conversacionService";
import { DataConversacion } from "@/models/Conversacion";
import { useSesion } from "@/hooks";
interface CabeceraTicketProps {
  ticket: DataTicket;
  abierto?: boolean;
}

const CabeceraTicket = ({ ticket,abierto }: CabeceraTicketProps) => {
  const navigate = useNavigate()
  const { info } = useSesion()
  const { isOnline: clienteOnline } = useValidarOnline(ticket.usuario?.idusuario)
  const { isOnline: empleadoOnline } = useValidarOnline(ticket.usuario?.idusuario)
  const { data:hayConversacion } = useQuery<DataConversacion>({
    queryKey: ["conversacion", ticket.idticket],
    queryFn: () => conversacionService.obtenerConversacionUsuario(ticket.idticket),
    refetchOnWindowFocus: false
  })
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex  gap-x-3 items-center py-2">
        {
          abierto &&
          <>
            <BotonAnterior className="transition-colors sticky top-0 left-0" defaultPath="/tickets"/>
            
          </>
        }
      
        <div className="pl-3 pt-2">
          <h2 className=" font-bold text-3xl">{ticket?.asunto}</h2>
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
          (!!hayConversacion || ticket.empleado_asignado === info.idusuario) &&
          <BotonChat idchat={ticket.idticket} className="transition-colors sticky top-0 left-0" />
        }

        
      </div>
    </div>
  );
}
export default CabeceraTicket;