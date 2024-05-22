
import Servicios from "@/components/views/servicios/Servicios";
import { VistaRol } from "@/components/wrappers"
import { ImagenTitulo } from "@/components/layout/FormatoImagenes";
import AlternarFormularioSticky from "../layout/AlternarFormularioSticky";
import FormularioTicket from "../formularios/ticket";
import { BotonPositivo, BotonPrimario } from "../UI/Botones";
import FormularioServicio from "../formularios/servicio";
import AlternarFormulario from "../layout/AlternarFormulario";

const Home = () => {

  return (
    <>
      <div
        className="text-center bg-black text-white p-4 text-2xl">Tu servicio técnico de confianza 24/7</div>
      <ImagenTitulo urlImagen="https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0" titulo="Nuestros servicios"/>
      {/*TODO TARJETAS DE INFORMACION GENERICA COMO LAS CARACTERISTICAS DEL SERVICIO*/}
      <VistaRol roles={["cliente"]} permitirSinAutenticar>
        <AlternarFormularioSticky texto="Si tienes problemas, ¡Mándanos un ticket!" Formulario={FormularioTicket} Boton={BotonPrimario}/>

      </VistaRol>
      <VistaRol roles={["admin"]}>
        <AlternarFormulario claseMostrar="fixed sm:pt-topbar max-h-dvh z-50" className="transition-all z-10" texto="Agrega un nuevo servicio" Formulario={FormularioServicio} Boton={BotonPositivo} />

      </VistaRol>
      <div className="flex h-full flex-col py-6 px-6 md:px-10 gap-y-5 -z-10">
        <Servicios />
      </div>
    </>
  );
}
 
export default Home;