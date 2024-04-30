import { useForm } from "react-hook-form"
import ErrorFormulario from "./Error"
import { CamposCodigoVerificacion, codigoVerificacionResolver } from "./validators"
import { Boton, CampoTexto } from "../UI"
import { useParams } from "react-router-dom"
import { verificarCodigo, reenviarCodigo } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import FormularioAuth from "../UI/FormularioAuth"
import Enlace from "../UI/Enlace"
import { iniciarSesion } from "../../store/features/sesion"
import { useDispatch } from "react-redux"

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

    const res = await verificarCodigo(data, idcodigo);
    console.log(res)
    if (!res.error){
      dispatch(iniciarSesion(res.token))
      return navigate("/")
    }
    if (res.error.status === 401 ) return setError("codigo", { message: res.error.data.error })
    setError("root", { message: "Error con el servidor" })
  }

  const reenvio = async () => {
    if (!idcodigo) return;
    const res = await reenviarCodigo(idcodigo);
    console.log(res)
  }

  return (
    <FormularioAuth titulo="Codigo verificación" onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      {errors.codigo && <ErrorFormulario>{errors.codigo.message}</ErrorFormulario>}
      <CampoTexto  {...register("codigo")} placeholder="Codigo de verificacion" type="text" />
      <Boton type="submit" >Enviar codigo</Boton>
      <Enlace onClick={reenvio} disabled={true} >Reenviar codigo</Enlace>
    </FormularioAuth>
  )
}

export default FormularioCodigoVerificacion;