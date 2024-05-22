import { useEffect, useRef, useState } from "react";

export const useCargaImagen = (url_imagen: string) => {
  const [loading, setLoading] = useState(true)
  const refTimer = useRef({
    timer: 0
  })

  useEffect(() => {
    if (url_imagen){
      console.log("cargando imagen")
      const handleImageLoad = () => {
        setLoading(false);
      };
      clearTimeout(refTimer.current.timer)
      refTimer.current.timer = setTimeout(() => {
        handleImageLoad()
        img.removeEventListener("load", handleImageLoad);
      }, 6000) as any
      setLoading(true);
      const img = new Image();
      img.src = url_imagen;
  
  
      img.addEventListener("load", handleImageLoad);
      return () => {
        img.removeEventListener("load", handleImageLoad);
      };
    }else{
      setLoading(false)
    }

  }, [url_imagen]);

  return loading
}