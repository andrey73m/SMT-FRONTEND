import {useForm} from "react-hook-form"
import ErrorFormulario from "./Error"
import { CamposCodigoVerificacion, codigoVerificacionResolver } from "./validators"
import { Boton, CampoTexto } from "../UI"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { verificarCodigo, reenviarCodigo } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

const cookies = new Cookies();

const FormularioCodigoVerificacion = () => {

  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<CamposCodigoVerificacion>({
    defaultValues: {
      codigo: ""
    },
    resolver: codigoVerificacionResolver
  })

  const { idcodigo } = useParams()
  const navigate = useNavigate()
  const onSubmit = async (data: CamposCodigoVerificacion) => {
    console.log(idcodigo)
    if (!idcodigo) return;

    const res = await verificarCodigo(data, idcodigo);
    console.log(res)
    if (!res.error){
      cookies.set("token", res.token);
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
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-indigo-950 w-1/4 flex flex-col items-center justify-normal p-5">
      <h1 className="mb-5 font-bold text-3xl">Codigo verificación</h1>
      {errors.codigo && <ErrorFormulario>{errors.codigo.message}</ErrorFormulario>}
      <CampoTexto  {...register("codigo")} placeholder="Codigo de verificacion" type="text" />
      <Boton type="submit" >Enviar codigo</Boton>
      <p onClick={reenvio} className="hover:underline hover:text-violet-300 m-2 hover:cursor-pointer">Reenviar codigo</p>
    </form>
  )
}

export default FormularioCodigoVerificacion;