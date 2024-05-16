import { useState } from "react";

import {  BotonPrimario } from "../UI/Botones";
import IconoEnvio from "../icons/Envio";

interface PaginConversacionProps {
  
}
 
const PaginConversacion = () => {

  const [mensaje, setMensaje] = useState("")

  return (
    <div className="flex flex-col w-full h-full justify-between border-l-2">
      {/*CABECERA DEL CHAT*/}
      <div className="h-8 md:h-12 w-full bg-violet-700 text-white shadow-sm p-2 pl-10">
        <h3 className="font-bold text-xl">Juanito</h3>
      </div>
      {/*CUERPO DEL CHAT*/}
      <div className=" grow overflow-y-auto w-full">

      </div>
      {/*PIE DEL CHAT*/}
      <div className="flex min-h-16 max-h-32 w-full pb-2 px-4 items-end">
        <form className="h-full flex gap-x-2 w-full">
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="grow w-full rounded-xl border-2 transition-all duration-500 bg-white px-4 pt-2 resize-none align-baseline focus:outline-none focus:border-violet-700"
            rows={1}
            placeholder="Escribe un mensaje"/>
          <div className="h-full w-14 content-end">
            <BotonPrimario><IconoEnvio /></BotonPrimario>

          </div>
        </form>
      
      </div>
    </div>
  );
}
 
export default PaginConversacion;