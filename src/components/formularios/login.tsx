import { useForm } from "react-hook-form"
import { CampoTexto } from "../UI"
import { loginResolver, CamposLogin } from "./validators";
import ErrorFormulario from "./Error"
import { Link, useNavigate } from "react-router-dom";
import FormularioAuth from "../UI/FormularioAuth";
import Enlace from "../UI/Enlace";
import { login } from "@/store/features/sesion";
import { useAppDispatch } from "@/store";
import { ThunkResponse } from "@/store/utils";
import { BotonPrimario } from "../UI/Botones";

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
  const dispatch = useAppDispatch();
  const onSubmit = async(data: CamposLogin) => {
    
    console.log(data)
    const res = await dispatch(login(data)) as ThunkResponse
    if (res.payload.error){
      const response = res.payload.error
      console.log("error:",res.payload.error)
      if (response){
        if (response.status === 401) return setError("root", { message: response.message });
      }
      return setError("root", { message: "Error con el servidor" })
    }
    if (res.payload){
      if (res.payload.verificationId){
        const id = res.payload.verificationId
        return navigate(`/verificacion/${id}`)
      }

      return navigate("/")
    }
    
  }

  return (
    <FormularioAuth titulo="Iniciar sesión" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      {errors.email && <ErrorFormulario>{errors.email.message}</ErrorFormulario>}
      <CampoTexto  {...register("email")} placeholder="Correo" type="email"/>
      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>
      <BotonPrimario type="submit" >Iniciar sesión</BotonPrimario>
      <p>¿No tienes cuenta?</p>
      <Link to="/registro">
        <Enlace>Registrate aquí</Enlace>
      </Link>
    </FormularioAuth>
      
  )
}

export default FormularioLogin;