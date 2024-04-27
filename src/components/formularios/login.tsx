import { useForm } from "react-hook-form"
import { Boton, CampoTexto } from "../UI"
import { loginResolver, CamposLogin } from "./validators";
import ErrorFormulario from "./Error"


const FormularioLogin = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CamposLogin>(
    {
      defaultValues: {
        correo: "",
        clave: "",
      },
      resolver: loginResolver
    }
  )
  
  const onSubmit = (data) => {
    
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Iniciar sesión</h1>
          
      {errors.correo && <ErrorFormulario>{errors.correo.message}</ErrorFormulario>}
      <CampoTexto  {...register("correo")} placeholder="Correo" type="email"/>
      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>
      <Boton type="submit" >Iniciar sesión</Boton>
      {/*<p>¿No tienes sesion?
        <a href="" role="link">
          <span className="text-blue-500">  Registrate aqui</span>
        </a>
  </p>*/}
    </form>
  )

}

export default FormularioLogin;