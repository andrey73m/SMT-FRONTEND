import { TextoClickable } from "@/components/UI";
import { VistaRol } from "@/components/wrappers";
import { DataTicket } from "@/models";
import {  useNavigate } from "react-router-dom";
import BotonAnterior from "@/components/layout/BotonAnterior"

interface CabeceraTicketProps {
  ticket: DataTicket;
  abierto?: boolean;
}

const CabeceraTicket = ({ ticket,abierto }: CabeceraTicketProps) => {
  const navigate = useNavigate()
  
  return (
    <>
      <div className="flex gap-x-3 items-center py-2">
        {
          abierto &&
          <BotonAnterior className="transition-colors sticky top-0 left-0" defaultPath="/tickets"/>
        }
      
        <div className="pl-3 pt-2">
          <h2 className=" font-bold text-3xl">{ticket?.asunto}</h2>
          <div className="font-bold text-gray-500 inline">
            <VistaRol roles={["admin", "empleado"]}>
              {
                ticket.usuario ?

                  <TextoClickable onClick={() => navigate({ pathname: "/tickets", search: `idusuario=${ticket.usuario?.idusuario}` })}>
                    {ticket.usuario.nombres} {ticket.usuario.apellidos}
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
    </>
  );
}
export default CabeceraTicket;