import cn from "@/cn";
import { ClassValue } from "clsx";

interface ImagenBlurProps extends React.PropsWithChildren {
  urlImagen: string;
  classNameImagen?: ClassValue;
  classNameContenedor?: ClassValue
}

const ImagenBlur = ({ urlImagen, children, classNameContenedor, classNameImagen }: ImagenBlurProps) => {
  return (
    <div
      className={cn("bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center z-0", classNameImagen)}
      style={{ backgroundImage: `url('${urlImagen}')` }}>
      <div className={cn("backdrop-blur-sm w-full h-full", classNameContenedor)}>
        {children}
      </div>
    </div>
  );
}

export default ImagenBlur;