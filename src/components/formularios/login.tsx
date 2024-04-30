import { useForm } from "react-hook-form"
import { Boton, CampoTexto } from "../UI"
import { loginResolver, CamposLogin } from "./validators";
import ErrorFormulario from "./Error"
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import FormularioAuth from "../UI/FormularioAuth";
import Enlace from "../UI/Enlace";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../../store/features/sesion";
import { AxiosError } from "axios";

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
  const dispatch = useDispatch();
  const onSubmit = async(data: CamposLogin) => {
    
    console.log(data)
    const res: any = await login(data).catch((err: AxiosError) => {
      const { response } = err
      if (response){
        const data = response.data as any
        if (response.status === 401) return setError("root", { message: data.error });
      }
      setError("root", { message: "Error con el servidor" })
      return null
    });
    if (res) {
      if (res.verificationId){
        const id = res.verificationId
        navigate(`/verificacion/${id}`)
      }
      if (res.token) {
        dispatch(iniciarSesion(res.token))
        navigate("/")
      }
    }
    
  }

  return (
    <FormularioAuth titulo="Iniciar sesión" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      {errors.email && <ErrorFormulario>{errors.email.message}</ErrorFormulario>}
      <CampoTexto  {...register("email")} placeholder="Correo" type="email"/>
      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>
      <Boton type="submit" >Iniciar sesión</Boton>
      <p>¿No tienes cuenta?</p>
      <Link to="/registrarse">
        <Enlace>Registrate aquí</Enlace>
      </Link>
    </FormularioAuth>
      
  )
}

export default FormularioLogin;