import AlternarFormulario, { AlternarFormularioProps } from "./AlternarFormulario"
 
const AlternarFormularioSticky = (props: AlternarFormularioProps) => {


  return (
    <AlternarFormulario
      claseMostrar="fixed  md:sticky md:top-topbar z-50"
      {...props}/>
  );
}
 
export default AlternarFormularioSticky;