import { ImagenTitulo } from "@/components/layout/FormatoImagenes";
import QuienesSomos from "../views/general_info/AboutUs";

const AboutUs = () => {
  return(
    <>
      <ImagenTitulo titulo="¿Quiénes somos?" urlImagen="https://img.freepik.com/fotos-premium/grupo-personas-palabra-sus-manos_662214-691199.jpg"/>
      <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
        <QuienesSomos/>
      </div>
    </>
  )
}

export default AboutUs;