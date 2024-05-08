
import Servicios from "../views/servicios/Servicios";
import VistaRol from "../wrappers/VistaRol";
import { useState } from "react";
import FormularioTicket from "../formularios/ticket";
import clsx from "clsx"
 
const Home = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  return (
    <>
      <div
        className="bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center"
        style={{ backgroundImage: "url('https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0')" }}
      >
        <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
          <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-12 sticky">Nuestros servicios</h2>
        </div>
      </div>
      <VistaRol roles={["cliente"]} permitirSinAutenticar>
        <div className="w-full sticky top-12">

          <div onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className={clsx("text-center  p-4 font-bold cursor-pointer",{
              "bg-violet-700 hover:bg-violet-500 text-white": !mostrarFormulario,
              "bg-slate-200 hover:bg-slate-300 text-violet-700": mostrarFormulario
            })}>Si tienes problemas, ¡Mándanos un ticket!</div>
        </div>
        {
          mostrarFormulario &&
            <div className={clsx("bg-white", { "opacity-0": !mostrarFormulario, "opacity-100": mostrarFormulario })}>
              <FormularioTicket/>
            </div>
        }
      </VistaRol>
      <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
        <Servicios />
      </div>
    </>
  );
}
 
export default Home;