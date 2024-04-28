import { useForm } from "react-hook-form"
import { Boton, CampoTexto , CampoFecha } from "../UI"
import { registroResolver, CamposRegistro } from "./validators"
import ErrorFormulario from "./Error"
import { registrar } from "../../services/auth"
import { useNavigate } from "react-router-dom"


const FormularioRegistrarse = () => {

  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<CamposRegistro>(
    {
      defaultValues: {
        nombres: "",
        apellidos: "",
        email: "",
        clave: "",
        confirmarClave: "",
        fecha_nac: ""
      },
      resolver: registroResolver
    }
  )
  const navigate = useNavigate();
  const onSubmit = async(data: CamposRegistro) => {
    console.log(data)
    const res = await registrar(data)
    if (!res.error){
      const id = res.verificationId
      navigate(`/verificacion/${id}`)
    }
    if (res.error.status === 409) return setError("email", { message: res.error.data.error })
    if (res.error.status === 401) return setError("root", { message: res.error.data.error })
    
    setError("root", { message: "Error con el servidor" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrarse</h1>
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      
      {errors.nombres && <ErrorFormulario>{errors.nombres.message}</ErrorFormulario>}
      <CampoTexto {...register("nombres")} placeholder="Nombres"/>
      
      {errors.apellidos && <ErrorFormulario>{errors.apellidos.message}</ErrorFormulario>}
      <CampoTexto {...register("apellidos")} placeholder="Apellidos"/>

      {errors.email && <ErrorFormulario>{errors.email.message}</ErrorFormulario>}
      <CampoTexto  {...register("email")} placeholder="Correo" type="email"/>

      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>

      {errors.confirmarClave && <ErrorFormulario>{errors.confirmarClave.message}</ErrorFormulario>}
      {/*TODO:OPCIONAL > HACER UN CAMPO DE CONTRASEÑAS QUE PERMITA VER LA CON UN BOTON*/}
      <CampoTexto {...register("confirmarClave")} placeholder=" Confirmar Contraseña" type="password"/>

      {errors.fecha_nac && <ErrorFormulario>{errors.fecha_nac.message}</ErrorFormulario>}
      <CampoFecha {...register("fecha_nac")} placeholder="Fecha de nacimiento"/>

      <Boton type="submit" >Registrarse</Boton>
    </form>
  )

}

export default FormularioRegistrarse;