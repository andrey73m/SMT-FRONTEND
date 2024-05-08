interface ImagenTituloProps {
  titulo: string;
  urlImagen: string;
}
 
const ImagenTitulo = ({ titulo, urlImagen }: ImagenTituloProps) => {
  return (
    <div
      className="bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center z-0"
      style={{ backgroundImage: `url('${urlImagen}')` }}>
      <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
        <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-12 sticky">{titulo}</h2>
      </div>
    </div>
  );
}
 
export default ImagenTitulo;