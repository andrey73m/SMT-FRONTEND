import EditorTexto from "./EditorTexto"

interface VisorTextoProps{
  contenido: string
  contenedor: string
}

const VisorTexto = ({ contenedor, contenido }: VisorTextoProps) => {
  return (
    <EditorTexto
      className="text-2xl -z-40"
      readOnly
      modules={{ toolbar: {
        container: `#${contenedor}`
      } }}
      formats={["font"]}
      value={contenido}
    />
  );
}
 
export default VisorTexto;