import { Boton, CampoTexto } from "../UI"
const FormularioLogin = () => {

  return (
    <form className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Iniciar sesión</h1>
          
      <CampoTexto placeholder="Nombre de usuario o email" name="email" type="email" required/>
      <CampoTexto placeholder="Contraseña" type="password" name="password" required/>
      <Boton children="Ingresar"/><br/>
      <p>¿No tienes sesion? 
          <a href="" role="link">
          <span className="text-blue-500">  Registrate aqui</span>
          </a>
        </p>
    </form>
  )

}

export default FormularioLogin;