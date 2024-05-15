import { ImagenTitulo } from "../layout/imagenes";
import QuienesSomos from "../views/general_info/AboutUs";

const AboutUs = () => {
  return(
    <>
      <ImagenTitulo titulo="¿Quiénes somos?" urlImagen="https://discoveryeb.com/wp-content/uploads/2022/09/Discovery_Sobre-nosotros_banner.jpg"/>
      <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
        <QuienesSomos/>
      </div>
    </>
  )
}

export default AboutUs;