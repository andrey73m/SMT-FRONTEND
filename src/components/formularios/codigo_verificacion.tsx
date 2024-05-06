import { useForm } from "react-hook-form"
import ErrorFormulario from "./Error"
import { CamposCodigoVerificacion, codigoVerificacionResolver } from "./validators"
import {  CampoTexto } from "../UI"
import { useParams } from "react-router-dom"
import authService from "../../services/authService"
import { useNavigate } from "react-router-dom"
import FormularioAuth from "../UI/FormularioAuth"
import Enlace from "../UI/Enlace"
import { verificar } from "../../store/features/sesion"
import { useDispatch } from "react-redux"
import { BotonPrimario } from "../UI/Botones"

const FormularioCodigoVerificacion = () => {

  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<CamposCodigoVerificacion>({
    defaultValues: {
      codigo: ""
    },
    resolver: codigoVerificacionResolver
  })

  const { idcodigo } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async (data: CamposCodigoVerificacion) => {
    console.log(idcodigo)
    if (!idcodigo) return;

    const res = await dispatch(verificar({ codigo: data, idcodigo })) as any
    if (res.payload.error) {
      const response = res.payload.error
      console.log("error:", res.payload.error)
      if (response) {
        if (response.status === 401) return setError("root", { message: response.message });
      }
      return setError("root", { message: "Error con el servidor" })
    }
    if (res.payload) {
      if (res.payload.verificationId) {
        const id = res.payload.verificationId
        return navigate(`/verificacion/${id}`)
      }

      return navigate("/")
    }
  }

  const reenvio = async () => {
    if (!idcodigo) return;
    const res = await authService.reenviarCodigo(idcodigo);
    console.log(res)
  }

  return (
    <FormularioAuth titulo="Codigo verificación" onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      {errors.codigo && <ErrorFormulario>{errors.codigo.message}</ErrorFormulario>}
      <CampoTexto  {...register("codigo")} placeholder="Codigo de verificacion" type="text" />
      <BotonPrimario type="submit" >Enviar codigo</BotonPrimario>
      <Enlace onClick={reenvio} disabled={true} >Reenviar codigo</Enlace>
    </FormularioAuth>
  )
}

export default FormularioCodigoVerificacion;