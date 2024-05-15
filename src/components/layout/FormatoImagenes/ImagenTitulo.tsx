import ImagenBlur from "./ImagenBlur";

interface ImagenTituloProps {
  titulo: string;
  urlImagen: string;
}
 
const ImagenTitulo = ({ titulo, urlImagen }: ImagenTituloProps) => {
  return (
    <ImagenBlur urlImagen={urlImagen} classNameContenedor="bg-black/50 justify-center items-center flex">
      <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-topbar sticky">{titulo}</h2>
    </ImagenBlur>
  );
}
 
export default ImagenTitulo;