import { useForm } from "react-hook-form"
import { Boton, CampoTexto } from "../UI"
import { loginResolver, CamposLogin } from "./validators";
import ErrorFormulario from "./Error"
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"

const cookies = new Cookies();

const FormularioLogin = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CamposLogin>(
    {
      defaultValues: {
        email: "",
        clave: "",
      },
      resolver: loginResolver
    }
  )
  const navigate = useNavigate();
  const onSubmit = async(data: CamposLogin) => {
    
    console.log(data)
    const res = await login(data);
    if (!res.error) {
      if (res.verificationId){
        const id = res.verificationId
        navigate(`/verificacion/${id}`)
      }
      if (res.token) {
        cookies.set("token", res.token);
        navigate("/")
      }
    }
    if(res.error.status === 401) return setError("root", { message: res.error.data.error });
    setError("root", { message: "Error con el servidor" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Iniciar sesión</h1>
      
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      {errors.email && <ErrorFormulario>{errors.email.message}</ErrorFormulario>}
      <CampoTexto  {...register("email")} placeholder="Correo" type="email"/>
      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>
      <Boton type="submit" >Iniciar sesión</Boton>
      <p>¿No tienes sesion?
        <Link to="/registrarse">
          <span className="text-blue-500 m-2">Registrate aqui</span>
        </Link>
      </p>
    </form>
  )
}

export default FormularioLogin;