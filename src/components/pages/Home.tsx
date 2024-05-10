
import Servicios from "@/components/views/servicios/Servicios";
import { VistaRol } from "@/components/wrappers"
import ImagenTitulo from "@/components/layout/imagenes/ImagenTitulo";
import AlternarFormularioTicket from "@/components/layout/AlternarFormularioTicket";



const Home = () => {
  return (
    <>
      <ImagenTitulo urlImagen="https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0" titulo="Nuestros servicios"/>
      <VistaRol roles={["cliente"]} permitirSinAutenticar>
        <AlternarFormularioTicket/>
      </VistaRol>
      <div className="flex h-full flex-col py-6 px-10 gap-y-5">
        <Servicios />
      </div>
    </>
  );
}
 
export default Home;