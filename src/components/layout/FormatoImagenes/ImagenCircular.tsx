import React, { useEffect, useState } from "react";
import cn from "@/cn";
import { useCargaImagen } from "@/hooks/imagenes";

interface ImagenCircularProps extends React.HTMLAttributes<HTMLDivElement> {
  url_imagen: string
}
 
const ImagenCircular = ({ url_imagen, className,...props }: ImagenCircularProps) => {
  const loading = useCargaImagen(url_imagen)
  return (
    <div
      className={cn("transition-all  bg-image bg-center bg-cover bg-slate-200",{
        "animate-pulse": loading
      }, className)}
      style={{ backgroundImage: `url('${url_imagen}')` }}
      {...props}
      
      
    />
  );
}
 
export default ImagenCircular;