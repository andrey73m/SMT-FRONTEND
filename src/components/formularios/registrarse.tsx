import { useForm } from "react-hook-form"
import { Boton, CampoTexto , CampoFecha } from "../UI"
import { registroResolver, CamposRegistro } from "./validators"
import ErrorFormulario from "./Error"



const FormularioRegistrarse = () => {

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CamposRegistro>(
    {
      defaultValues: {
        nombres: "",
        apellidos: "",
        correo: "",
        clave: "",
        confirmarClave: "",
        fechaNacimiento: ""
      },
      resolver: registroResolver
    }
  )
  
  const onSubmit = (data) => {
    
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Registrarse</h1>

      {errors.nombres && <ErrorFormulario>{errors.nombres.message}</ErrorFormulario>}
      <CampoTexto {...register("nombres")} placeholder="Nombres"/>
      
      {errors.apellidos && <ErrorFormulario>{errors.apellidos.message}</ErrorFormulario>}
      <CampoTexto {...register("apellidos")} placeholder="Apellidos"/>

      {errors.correo && <ErrorFormulario>{errors.correo.message}</ErrorFormulario>}
      <CampoTexto  {...register("correo")} placeholder="Correo" type="email"/>

      {errors.clave && <ErrorFormulario>{errors.clave.message}</ErrorFormulario>}
      <CampoTexto {...register("clave")} placeholder="Contraseña" type="password"/>

      {errors.confirmarClave && <ErrorFormulario>{errors.confirmarClave.message}</ErrorFormulario>}
      {/*TODO:OPCIONAL > HACER UN CAMPO DE CONTRASEÑAS QUE PERMITA VER LA CON UN BOTON*/}
      <CampoTexto {...register("confirmarClave")} placeholder=" Confirmar Contraseña" type="password"/>

      {errors.fechaNacimiento && <ErrorFormulario>{errors.fechaNacimiento.message}</ErrorFormulario>}
      <CampoFecha {...register("fechaNacimiento")} placeholder="Fecha de nacimiento"/>

      <Boton type="submit" >Registrarse</Boton>
    </form>
  )

}

export default FormularioRegistrarse;