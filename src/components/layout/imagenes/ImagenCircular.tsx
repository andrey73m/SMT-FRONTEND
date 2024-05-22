import React from "react";
import cn from "@/cn";

interface ImagenCircularProps extends React.HTMLAttributes<HTMLDivElement> {
  url_imagen: string
}
 
const ImagenCircular = ({ url_imagen, className,...props }: ImagenCircularProps) => {
  return (
    <div
      className={cn("transition-all lg:rounded-full bg-image bg-center bg-cover h-80 w-full lg:mb-0 lg:w-80", className)}
      style={{ backgroundImage: `url('${url_imagen}')` }}
      {...props}
    />
  );
}
 
export default ImagenCircular;