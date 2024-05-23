import { useForm } from "react-hook-form"
import ErrorFormulario from "./Error"
import { CamposCodigoVerificacion, codigoVerificacionResolver } from "./validators"
import CampoTexto from "../UI/CampoTexto"
import { useParams, useNavigate } from "react-router-dom"
import authService from "@/services/authService"
import FormularioAuth from "../UI/FormularioAuth"
import Enlace from "../UI/Enlace"
import { verificar } from "@/store/features/sesion"
import { BotonPrimario } from "../UI/Botones"
import { useAppDispatch, useAppSelector } from "@/store"
import { useRedireccionParam } from "@/hooks"
import { SpinnerPagina } from "../UI"

const FormularioCodigoVerificacion = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm<CamposCodigoVerificacion>({
    defaultValues: {
      codigo: ""
    },
    resolver: codigoVerificacionResolver
  })
  const { cargando } = useAppSelector(state => state.sesion)
  const { idcodigo } = useParams()
  const redireccion = useRedireccionParam("/")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onSubmit = async (data: CamposCodigoVerificacion) => {

    if (!idcodigo) return;
    const res = await dispatch(verificar({ codigo: data, idcodigo })) as any
    if (res.payload.error) {
      const response = res.payload.error
      if (response) {
        if (response.status === 401) return setError("root", { message: response.message });
      }
      return setError("root", { message: "Error con el servidor" })
    }
    if (res.payload.token) {
      return navigate(redireccion as any)
    }
  }

  const reenvio = async () => {
    if (!idcodigo) return;
    const res = await authService.reenviarCodigo(idcodigo);
  }

  return (
    <FormularioAuth titulo="Codigo verificación" onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 flex flex-col items-center justify-normal p-5">
      {cargando && <SpinnerPagina />}
      {errors.root && <ErrorFormulario>{errors.root.message}</ErrorFormulario>}
      {errors.codigo && <ErrorFormulario>{errors.codigo.message}</ErrorFormulario>}
      <CampoTexto  {...register("codigo")} placeholder="Codigo de verificacion" type="text" />
      <BotonPrimario type="submit" disabled={cargando}>Enviar codigo</BotonPrimario>
      <Enlace onClick={reenvio} disabled={true} >Reenviar codigo</Enlace>
    </FormularioAuth>
  )
}

export default FormularioCodigoVerificacion;