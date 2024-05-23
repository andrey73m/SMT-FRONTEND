import AlternarFormulario, { AlternarFormularioProps } from "./AlternarFormulario"
 
const AlternarFormularioSticky = (props: AlternarFormularioProps) => {


  return (
    <AlternarFormulario
      claseMostrar="fixed  md:sticky md:top-topbar h-dvh md:h-auto z-50 md:z-20"
      {...props}/>
  );
}
 
export default AlternarFormularioSticky;