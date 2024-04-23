import { Boton, CampoTexto , CampoFecha } from "../UI"
const FormularioRegistrarse = () => {

  return (
    <form className="rounded-lg bg-violet-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrarse</h1>
          
      <CampoTexto placeholder="Nombres"/>
      <CampoTexto placeholder="Apellidos" />
      <CampoTexto placeholder="Correo" type="email" />
      <CampoTexto placeholder="Contraseña" type="password" />
      <CampoTexto placeholder=" Confirmar Contraseña" type="password"/>
      <CampoFecha placeholder="Fecha de nacimiento"/>
      <Boton campo="Registrarse"/>
    </form>
  )

}

export default FormularioRegistrarse;