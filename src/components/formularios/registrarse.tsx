import { useForm } from "react-hook-form"
import { Boton, CampoTexto , CampoFecha } from "../UI"
import { registroResolver, CamposRegistro } from "./validators"
import ErrorFormulario from "./Error"
import authService from "../../services/authService"
import { useNavigate } from "react-router-dom"
import FormularioAuth from "../UI/FormularioAuth"
import { Link } from "react-router-dom"
import Enlace from "../UI/Enlace"
import { AxiosError } from "axios"
import VistaRol from "../wrappers/VistaRol"
import Select from "../UI/Select"

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

    const errores = (err: AxiosError) => {
      console.log(err)
      if (err.status === 409) return setError("email", { message: res.error.data.error })
      if (err.status === 401) return setError("root", { message: res.error.data.error })
      setError("root", { message: "Error con el servidor" })
      return null
    }

    let res: any;

    if(!data.rol) {
      
      res = await authService.registrar(data).catch(errores)
      if (res){
        const id = res.verificationId
        return navigate(`/verificacion/${id}`)
      }
      return;
    }
    
    res = await authService.registrarRol(data).catch(errores)
 
  }

  return (
    <FormularioAuth titulo="Registrarse"  onSubmit={handleSubmit(onSubmit)} >
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      <VistaRol roles={["admin"]}>
        <Select {...register("rol")} className="bg-indigo-900" defaultValue="Empleado">
          <option>Administrador</option>
          <option>Empleado</option>
          <option>Cliente</option>
        </Select>
      </VistaRol>

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
      <p className="">¿Ya tiene cuenta?</p>
      <Link to="/login">
        <Enlace>Inicia sesión aquí</Enlace>
      </Link>
    </FormularioAuth>
  )

}

export default FormularioRegistrarse;