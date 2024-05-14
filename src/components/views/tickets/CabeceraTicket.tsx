import { TextoClickable } from "@/components/UI";
import IconoFlecha from "@/components/icons/Flecha";
import { VistaRol } from "@/components/wrappers";
import { useRedireccionParam } from "@/hooks/parametroRedireccion";
import { DataTicket } from "@/models";
import {  useNavigate } from "react-router-dom";

interface CabeceraTicketProps {
  ticket: DataTicket;
  abierto?: boolean;
}

const CabeceraTicket = ({ ticket,abierto }: CabeceraTicketProps) => {
  const navigate = useNavigate()
  const redireccion = useRedireccionParam("/tickets")
  const cerrar = () => {
    navigate(redireccion)
  }
  return (
    <>
      <div className="flex gap-x-3 items-center py-2">
        {
          abierto &&
          <div onClick={cerrar} className="w-10 h-10 rounded-full p-1 text-slate-400 hover:text-slate-500 hover:bg-slate-200 transition-colors sticky top-0 left-0">
            <IconoFlecha />
          </div>
        }
      
        <div className="pl-3 pt-2">
          <h2 className=" font-bold text-3xl">{ticket?.asunto}</h2>
          <div className="font-bold text-gray-500 inline">
            <VistaRol roles={["admin", "empleado"]}>
              {
                ticket.usuario ?

                  <TextoClickable onClick={() => navigate({ pathname: "/tickets", search: `idusuario=${ticket.usuario.idusuario}` })}>
                    {ticket.usuario.nombres} {ticket.usuario.apellidos}
                  </TextoClickable>
                  :
                  <TextoClickable onClick={() => navigate({ pathname: "/tickets", search:`email=${ticket.email}` })}>
              Usuario no registrado - {ticket.email}
                  </TextoClickable>
              }

            </VistaRol>
            <VistaRol roles={["cliente", "admin"]}>
                
              <p>
                {
                  ticket.empleado ?
                    <>{ticket.empleado.nombres} {ticket.empleado.apellidos}</> :
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