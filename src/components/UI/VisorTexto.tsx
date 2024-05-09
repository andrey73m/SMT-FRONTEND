import cn from "@/cn";
import EditorTexto from "./EditorTexto"

interface VisorTextoProps{
  contenido: string
  className?: string
}

const VisorTexto = ({ contenido, className }: VisorTextoProps) => {
  return (
    <EditorTexto
      className={cn("text-2xl -z-40",className)}
      readOnly
      value={contenido}
    />
  );
}
 
export default VisorTexto;