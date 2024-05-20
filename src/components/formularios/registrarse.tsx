import { useForm } from "react-hook-form"
import {  CampoTexto , CampoFecha, SpinnerPagina } from "../UI"
import { registroResolver, CamposRegistro } from "./validators"
import ErrorFormulario from "./Error"
import FormularioAuth from "../UI/FormularioAuth"
import Enlace from "../UI/Enlace"
import { AxiosError } from "axios"
import { VistaRol } from "../wrappers"
import Select from "../UI/Select"
import { BotonPrimario } from "../UI/Botones"
import QueyrParamsLink from "../wrappers/QueryParamsLink"
import useNavigateParams from "@/hooks/navigateParams"
import { useAppDispatch, useAppSelector } from "@/store"
import { registro } from "@/store/features/sesion"

const FormularioRegistrarse = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm<CamposRegistro>(
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
  const navigate = useNavigateParams();
  const { cargando } = useAppSelector(state => state.sesion)
  const dispatch = useAppDispatch()
  
  const onSubmit = async(data: CamposRegistro) => {
    console.log(data)

    const errores: any = (err: any) => {
      console.log(err)
      if (err.status === 409) return setError("email", { message: err.response?.data.error })
      if (err.status === 401) return setError("root", { message: err.response?.data.error })
      setError("root", { message: "Error con el servidor" })
      return null
    }



    if(!data.rol) {
      
      const res = await dispatch(registro(data)).catch(errores)
      console.log(res)
      if (res.payload){
        const id = res.payload.verificationId
        return navigate(`/verificacion/${id}`)
      }
      return;
    }
    
    const res = await dispatch(registro(data)).catch(errores)
    if (res.payload) {
      const id = res.payload.verificationId
      return navigate(`/verificacion/${id}`)
    }
  }

  return (
    <FormularioAuth titulo="Registrarse"  onSubmit={handleSubmit(onSubmit)} >
      {cargando && <SpinnerPagina/>}
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
      <div className="text-left w-full">

        <label>Fecha de nacimiento</label>
      </div>
      <CampoFecha {...register("fecha_nac")} placeholder="Fecha de nacimiento"/>

      <BotonPrimario type="submit" disabled={cargando}>Registrarse</BotonPrimario>
      <p className="">¿Ya tiene cuenta?</p>
      <QueyrParamsLink to="/login">
        <Enlace>Inicia sesión aquí</Enlace>
      </QueyrParamsLink>
    </FormularioAuth>
  )

}

export default FormularioRegistrarse;